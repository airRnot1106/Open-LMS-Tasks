import dayjs from 'dayjs';
import isSameOrAfter from 'dayjs/plugin/isSameOrAfter';
dayjs.extend(isSameOrAfter);

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
  private _pages: ListRow[][];
  private _currentPage: number;
  constructor() {
    this._categoryButton = CategoryButton.instance;
    this._categoryState = 0;
    this._pages = [];
    this._currentPage = 0;
  }

  static get instance() {
    if (!this._instance) {
      this._instance = new TaskList();
    }
    return this._instance;
  }

  async updateCategoryState(btnId: CategoryTypeNumber) {
    this._categoryState = btnId;
    this._currentPage = 0;
    await this.categorize();
  }

  updateCurrentPage(moving: number) {
    this._currentPage += moving;
    if (this._currentPage < 0) {
      this._currentPage = 0;
    }
    if (this._currentPage > this._pages.length - 1) {
      this._currentPage = this._pages.length - 1;
    }
    this.refreshTable();
  }

  private async categorize() {
    this._categoryButton.changeButtonState(this._categoryState);
    const storageData = await LocalStorage.get();
    const filteredData = this.filterStorageData(storageData);
    const sortedData = this.sort(Task.toArrays(filteredData));
    this.paginate(sortedData);
    this.refreshTable();
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

  private sort(tableRows: ListRow[]) {
    tableRows.sort((a, b) => {
      const first = dayjs(a[3]);
      const second = dayjs(b[3]);
      if (first.isAfter(second)) {
        return 1;
      } else {
        return -1;
      }
    });
    return tableRows;
  }

  private paginate(tableRows: ListRow[]) {
    const paginatedData: ListRow[][] = [];
    let page: ListRow[] = [];
    let index = 0;
    tableRows.forEach((tableRow, arrayIdx, array) => {
      page.push(tableRow);
      index++;
      if (index > 7 || arrayIdx === array.length - 1) {
        index = 0;
        paginatedData.push(page);
        page = [];
      }
    });
    this._pages = paginatedData;
  }

  private refreshTable() {
    const newTableRows = this._pages[this._currentPage];
    const table = <HTMLTableSectionElement>document.querySelector('tbody')!;
    table.innerHTML = '';
    if (!newTableRows) return;
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

document.getElementById('prev')?.addEventListener(
  'click',
  async () => {
    TaskList.instance.updateCurrentPage(-1);
  },
  false
);

document.getElementById('next')?.addEventListener(
  'click',
  async () => {
    TaskList.instance.updateCurrentPage(1);
  },
  false
);

document.getElementById('resetBtn')?.addEventListener(
  'click',
  async () => {
    await LocalStorage.reset();
    await TaskList.instance.updateCategoryState(0);
  },
  false
);

document.getElementById('openLmsLink')?.addEventListener(
  'click',
  async () => {
    const link = <HTMLLinkElement>document.getElementById('openLmsLink')!;
    await chrome.tabs.create({
      active: true,
      url: link.href,
    });
  },
  false
);
