import dayjs from 'dayjs';
import isSameOrAfter from 'dayjs/plugin/isSameOrAfter';
dayjs.extend(isSameOrAfter);

class LocalStorage {
  static async get() {
    const storageData = await this.fetch();
    const parsedJsonData = Object.entries(storageData).map(([, taskObj]) => {
      return <TaskObj>JSON.parse(taskObj);
    });
    return parsedJsonData;
  }

  static async getRaw() {
    const storageData = await this.fetch();
    return storageData;
  }

  private static async fetch(): Promise<{ [id: string]: string }> {
    return new Promise((resolve) => {
      chrome.storage.local.get((data) => {
        resolve(data);
      });
    });
  }

  static async set(item: { [id: string]: string }) {
    if (!Object.keys(item).length) {
      throw new Error('空のデータです');
    }
    for (const id in item) {
      for (const key in JSON.parse(item[id])) {
        const keys = [
          'taskName',
          'className',
          'type',
          'deadline',
          'submissionState',
        ];
        if (!keys.includes(key)) {
          throw new Error('データが破損しています');
        }
      }
    }
    await chrome.storage.local.set(item);
  }

  static async reset() {
    const storageData = await this.fetch();
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

class ElementAction {
  static expand(element: Element): Element[] {
    if (element.childElementCount) {
      const els = Array.from(element.children).map((child) => {
        return this.expand(child);
      });
      return [element, ...els.flat()];
    } else {
      return [element];
    }
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

class Menu {
  private static _instance: Menu;
  static get instance() {
    if (!this._instance) {
      this._instance = new Menu();
    }
    return this._instance;
  }

  async reset() {
    await LocalStorage.reset();
    await TaskList.instance.updateCategoryState(0);
  }

  async import(content: string) {
    try {
      const parsedData = <{ [id: string]: string }>JSON.parse(content);
      await LocalStorage.reset();
      await LocalStorage.set(parsedData);
      await TaskList.instance.updateCategoryState(0);
    } catch (error) {
      alert(error);
    }
  }

  async export() {
    const content = await LocalStorage.getRaw();
    const blob = new Blob([JSON.stringify(content)], {
      type: 'text/plane',
    });
    const link = <HTMLAnchorElement>document.getElementById('exportLink')!;
    link.href = window.URL.createObjectURL(blob);
    link.download = dayjs().format('YYYYMMDDHHmmss') + '.olt';
  }
}

class TaskList {
  private static _instance: TaskList;
  private readonly _categoryButton: CategoryButton;
  private readonly _menu: Menu;
  private _categoryState: CategoryTypeNumber;
  private _pages: ListRow[][];
  private _currentPage: number;
  private _isAllShow: boolean;
  constructor() {
    this._categoryButton = CategoryButton.instance;
    this._menu = Menu.instance;
    this._categoryState = 0;
    this._pages = [];
    this._currentPage = 0;
    this._isAllShow = false;
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

  async updateIsAllShow(isAllShow: boolean) {
    this._isAllShow = isAllShow;
    this._currentPage = 0;
    await this.categorize();
  }

  updateMenuDisplay(isShow: boolean) {
    const menu = document.getElementById('menu')!;
    const menuBtn = <HTMLInputElement>document.getElementById('menuBtn');
    if (isShow) {
      menu.classList.remove('hidden');
      menuBtn.checked = true;
    } else {
      menu.classList.add('hidden');
      menuBtn.checked = false;
    }
  }

  async resetTaskData() {
    await this._menu.reset();
  }

  async importTaskData(file: string) {
    await this._menu.import(file);
  }

  async exportTaskData() {
    await this._menu.export();
  }

  private async categorize() {
    this._categoryButton.changeButtonState(this._categoryState);
    const storageData = await LocalStorage.get();
    const filteredData = this.filterStorageData(storageData);
    const sortedData = this.sort(Task.toArrays(filteredData));
    this.paginate(sortedData);
    if (!this._isAllShow) {
      this.purgePage();
    }
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

  private purgePage() {
    if (!this._pages.length) return;
    this._pages.forEach((page, index, pages) => {
      const submitted = page.filter((rowData) => {
        return rowData[4] === '提出済み';
      });
      if (submitted.length === 8) {
        pages.splice(index, 1);
      }
    });
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

document.getElementById('toggle')?.addEventListener('click', async (e) => {
  TaskList.instance.updateIsAllShow(
    (<HTMLInputElement>e.currentTarget).checked
  );
});

document.getElementById('resetBtn')?.addEventListener(
  'click',
  async () => {
    await TaskList.instance.resetTaskData();
  },
  false
);

document.getElementById('importLink')?.addEventListener('change', (e) => {
  const files = (<HTMLInputElement>e.currentTarget).files;
  if (!files) return;
  const target = files[0];
  if (!target.name.endsWith('.olt')) {
    alert('ファイルの形式が正しくありません');
    return;
  }
  const reader = new FileReader();
  reader.readAsText(target, 'utf-8');
  reader.onload = () => {
    TaskList.instance.importTaskData(<string>reader.result);
  };
});

document.getElementById('menuBtn')?.addEventListener('click', (e) => {
  TaskList.instance.updateMenuDisplay(
    (<HTMLInputElement>e.currentTarget).checked
  );
});

document.getElementById('openLmsLink')?.addEventListener(
  'click',
  async (e) => {
    await chrome.tabs.create({
      active: true,
      url: (<HTMLLinkElement>e.currentTarget).href,
    });
  },
  false
);

document.addEventListener('click', (e) => {
  const menuBtnLabel = document.getElementById('menuBtnLabel')!;
  const menu = document.getElementById('menu')!;
  const els = [
    ...ElementAction.expand(menuBtnLabel),
    ...ElementAction.expand(menu),
  ];
  let isValid = false;
  for (const el of els) {
    if ((<HTMLElement>e.target).isEqualNode(el)) {
      isValid = true;
      break;
    }
  }
  if (!isValid) {
    TaskList.instance.updateMenuDisplay(false);
  }
});

window.onload = async () => {
  await TaskList.instance.exportTaskData();
};
