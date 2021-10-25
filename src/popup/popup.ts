import dayjs from 'dayjs';

class LocalStorage {
  static async get() {
    const storageData = <{ [id: string]: string }>await this.fetch();
    const parsedJsonData = Object.entries(storageData).map(([, taskObj]) => {
      return <TaskObj>JSON.parse(taskObj);
    });
    return parsedJsonData;
  }
  private static async fetch() {
    return new Promise((resolve) => {
      chrome.storage.local.get((data) => {
        resolve(data);
      });
    });
  }
  static async reset() {
    const storageData = <{ [id: string]: string }>await this.fetch();
    await chrome.storage.local.remove(Object.keys(storageData));
  }
}

class Task {
  static toArray(taskObj: TaskObj) {
    return <ListRow>[
      taskObj.taskName,
      taskObj.className,
      taskObj.type,
      taskObj.deadline,
      taskObj.submissionState,
    ];
  }
  static toArrays(taskObjs: TaskObj[]) {
    return taskObjs.map((taskObj) => {
      return this.toArray(taskObj);
    });
  }
}

class CategoryButton {
  private static _instance: CategoryButton;
  static get instance() {
    if (!this._instance) {
      this._instance = new CategoryButton();
    }
    return this._instance;
  }
  changeButtonState(btnId: CategoryTypeNumber) {
    const catButtonsList = document.getElementById('catButtons')?.childNodes;
    const catButtonsArray: HTMLElement[] = [];
    catButtonsList?.forEach((value, index, list) => {
      if (index === 0 || index === list.length - 1) return;
      catButtonsArray.push(<HTMLElement>value);
    });
    this.clearClass(catButtonsArray);
    this.activeClass(catButtonsArray, btnId);
  }
  private clearClass(catButtons: HTMLElement[]) {
    for (const catButton of catButtons) {
      catButton.classList.remove(
        'border-blue-400',
        'bg-blue-300',
        'hover:bg-blue-100'
      );
    }
  }
  private activeClass(catButtons: HTMLElement[], btnId: CategoryTypeNumber) {
    for (let i = 0; i < catButtons.length; i++) {
      if (i === btnId) {
        catButtons[i].classList.add('border-blue-400', 'bg-blue-300');
      } else {
        catButtons[i].classList.add('hover:bg-blue-100');
      }
    }
  }
}

class TaskList {
  private static _instance: TaskList;
  private readonly _categoryButton: CategoryButton;
  private _categoryState: CategoryTypeNumber;
  constructor() {
    this._categoryButton = CategoryButton.instance;
    this._categoryState = 0;
  }
  static get instance() {
    if (!this._instance) {
      this._instance = new TaskList();
    }
    return this._instance;
  }
  async updateCategoryState(btnId: CategoryTypeNumber) {
    this._categoryState = btnId;
    this.categorize();
  }
  private async categorize() {
    this._categoryButton.changeButtonState(this._categoryState);
    const storageData = await LocalStorage.get();
    const filteredData = this.filterStorageData(storageData);
    this.refreshTable(Task.toArrays(filteredData));
  }
  private filterStorageData(storageData: TaskObj[]) {
    let categorizedData: TaskObj[] = [];
    switch (this._categoryState) {
      case 0:
        categorizedData = storageData;
        break;
      case 1:
        categorizedData = storageData.filter((taskObj) => {
          return taskObj.submissionState === '未提出';
        });
        break;
      case 2:
        categorizedData = storageData.filter((taskObj) => {
          return taskObj.submissionState === '提出済み';
        });
        break;
    }
    return categorizedData;
  }
  private refreshTable(newTableRows: ListRow[]) {
    const table = <HTMLTableSectionElement>document.querySelector('tbody')!;
    table.innerHTML = '';
    for (const rowData of newTableRows) {
      const newRow = table.insertRow();
      for (const cellData of rowData) {
        const newCell = newRow.insertCell();
        newCell.appendChild(document.createTextNode(cellData));
        newCell.classList.add('border', 'px-2', 'text-left');
      }
    }
  }
  showDate() {
    const date = dayjs().format('YYYY/MM/DD HH:mm:ss');
    const element = document.getElementById('date')!;
    element.textContent = '最終更新: ' + date;
  }
}

(async () => {
  TaskList.instance.showDate();
  await TaskList.instance.updateCategoryState(0);
})();

document.getElementById('catBtn0')?.addEventListener(
  'click',
  async () => {
    await TaskList.instance.updateCategoryState(0);
  },
  false
);

document.getElementById('catBtn1')?.addEventListener(
  'click',
  async () => {
    await TaskList.instance.updateCategoryState(1);
  },
  false
);

document.getElementById('catBtn2')?.addEventListener(
  'click',
  async () => {
    await TaskList.instance.updateCategoryState(2);
  },
  false
);

document.getElementById('resetBtn')?.addEventListener('click', async () => {
  await LocalStorage.reset();
  await TaskList.instance.updateCategoryState(0);
});

document.getElementById('openLmsLink')?.addEventListener('click', async () => {
  const link = <HTMLLinkElement>document.getElementById('openLmsLink')!;
  await chrome.tabs.create({
    active: true,
    url: link.href,
  });
});
