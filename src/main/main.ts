class LocalStorage {
  static async get(): Promise<{ [id: string]: string }> {
    return new Promise((resolve) => {
      chrome.storage.local.get((data) => {
        resolve(data);
      });
    });
  }

  static async set(key: string | number, value: any) {
    return new Promise<void>((resolve) => {
      chrome.storage.local.set({ [key]: JSON.stringify(value) }, () => {
        resolve();
      });
    });
  }
}

class LMSManager {
  private static _instance: LMSManager;
  private readonly _allowPaths = ['&action=view'];
  static get instance() {
    if (!this._instance) {
      this._instance = new LMSManager();
    }
    return this._instance;
  }

  async execute() {
    console.log('Open LMS Tasks is working now.');
    const url = location.href;
    const id = this.extractId(url);
    const type = <TaskType>url.split('/')[4];
    let task: BaseTask;
    switch (type) {
      case 'assign':
        task = new Assign(id);
        break;
      case 'quiz':
        task = new Quiz(id);
    }
    await task.execute();
    console.log('Open LMS Tasks has completed working.');
  }

  private extractId(url: string) {
    const idPart = url.match(/(id|cmid)=\d+/);
    if (!idPart) throw new Error('invalid url.');
    return idPart[0].split('=').at(-1)!;
  }
}

abstract class BaseTask {
  protected _disallowPaths: string[];
  protected _id: string;
  protected _task: TaskObj | undefined;
  protected _cache: { [id: string]: string } | undefined;
  constructor(id: string) {
    this._disallowPaths = [];
    this._id = id;
  }

  abstract execute(): Promise<void>;
  protected async loadCache() {
    const cachesData = await LocalStorage.get();
    this._cache = cachesData;
  }

  protected isValidUrl(url: string) {
    for (const path of this._disallowPaths) {
      if (new RegExp(path).test(url)) return false;
    }
    return true;
  }

  protected existsCache() {
    if (!this._cache) throw new Error('cache is not defined.');
    return this._cache.hasOwnProperty(this._id);
  }

  protected abstract fetch(): void;
  protected abstract checkStatUpdate(): void;
}

class Assign extends BaseTask {
  constructor(id: string) {
    super(id);
    this._disallowPaths = ['action=editsubmission'];
  }

  async execute() {
    if (!this.isValidUrl(location.href)) return;
    await this.loadCache();
    if (this.existsCache()) {
      this._task = JSON.parse(this._cache![this._id]);
    } else {
      this.fetch();
    }
    this.checkStatUpdate();
    await LocalStorage.set(this._id, this._task);
  }

  protected fetch() {
    const taskName = document
      .querySelector('[role="main"]')
      ?.querySelector('h2')?.textContent!;
    const className = (() => {
      const text = document.querySelector('.page-header-headings')
        ?.textContent!;
      return text.slice(0, text.lastIndexOf(' '));
    })();
    const deadline = (() => {
      const dates = document.querySelectorAll(
        'div[data-region="activity-dates"] > div'
      );
      if (dates.length < 2) {
        return '---';
      }
      const rawDate = dates[1].textContent?.replace(/Due:|\s/g, '')!;
      const date = rawDate.split(/年|月|日\(\S曜日\)/);
      const day = date.slice(0, 3).join('/');
      const time = date.slice(3).join();
      return day + ' ' + time;
    })();
    const assign: TaskObj = {
      taskName: taskName,
      className: className,
      type: 'assign',
      deadline: deadline,
      submissionState: '未提出',
    };
    this._task = assign;
  }

  protected checkStatUpdate() {
    if (!this._task) throw new Error('task is not defined.');
    const tbody = document
      .querySelector('.generaltable')!
      .querySelector('tbody');
    const rawState = tbody?.children[0].querySelector('.c1')?.textContent!;
    const submissionState = rawState.includes('提出済み')
      ? '提出済み'
      : '未提出';
    this._task.submissionState = submissionState;
  }
}

class Quiz extends BaseTask {
  constructor(id: string) {
    super(id);
    this._disallowPaths = ['attempt.php', 'summary.php'];
  }

  async execute() {
    if (!this.isValidUrl(location.href)) return;
    await this.loadCache();
    if (this.existsCache()) {
      this._task = JSON.parse(this._cache![this._id]);
    } else {
      this.fetch();
    }
    this.checkStatUpdate();
    await LocalStorage.set(this._id, this._task);
  }

  protected fetch() {
    const taskName = document
      .querySelector('[role="main"]')
      ?.querySelector('h2')?.textContent!;
    const className = (() => {
      const text = document.querySelector('.page-header-headings')
        ?.textContent!;
      return text.slice(0, text.lastIndexOf(' '));
    })();
    const deadline = (() => {
      const info = document.querySelector('.quizinfo')!;
      const index = info.children.length - 2;
      const rawDate =
        info.children[index].textContent! +
        info.children[index + 1].textContent!;
      const date = rawDate.split(/\S*は |年 |月 |日\(\S曜日\) | に\S*/);
      const day = date.slice(1, 4).join('/');
      const time = date.slice(4, 5).join();
      return day + ' ' + time;
    })();
    const quiz: TaskObj = {
      taskName: taskName,
      className: className,
      type: 'quiz',
      deadline: deadline,
      submissionState: '未提出',
    };
    this._task = quiz;
  }

  checkStatUpdate() {
    if (!this._task) throw new Error('task is not defined.');
    if (
      /https:\/\/tlms.tsc.u-tokai.ac.jp\/mod\/quiz\/review.php\?attempt=\d+&cmid=\d+\S*/.test(
        location.href
      )
    ) {
      this._task.submissionState = '提出済み';
    } else {
      const table = document.querySelector('.generaltable');
      this._task.submissionState = !!table ? '提出済み' : '未提出';
    }
  }
}

(async () => {
  await LMSManager.instance.execute();
})();
