"use strict";
class LocalStorage {
    static async get() {
        return new Promise((resolve) => {
            chrome.storage.local.get((data) => {
                resolve(data);
            });
        });
    }
    static async set(key, value) {
        return new Promise((resolve) => {
            chrome.storage.local.set({ [key]: JSON.stringify(value) }, () => {
                resolve();
            });
        });
    }
}
class LMSManager {
    static _instance;
    _allowPaths = ['&action=view'];
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
        const type = url.split('/')[4];
        let task;
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
    extractId(url) {
        const idPart = url.match(/(id|cmid)=\d+/);
        if (!idPart)
            throw new Error('invalid url.');
        return idPart[0].split('=').at(-1);
    }
}
class BaseTask {
    _disallowPaths;
    _id;
    _task;
    _cache;
    constructor(id) {
        this._disallowPaths = [];
        this._id = id;
    }
    async loadCache() {
        const cachesData = await LocalStorage.get();
        this._cache = cachesData;
    }
    isValidUrl(url) {
        for (const path of this._disallowPaths) {
            if (new RegExp(path).test(url))
                return false;
        }
        return true;
    }
    existsCache() {
        if (!this._cache)
            throw new Error('cache is not defined.');
        return this._cache.hasOwnProperty(this._id);
    }
}
class Assign extends BaseTask {
    constructor(id) {
        super(id);
        this._disallowPaths = ['action=editsubmission'];
    }
    async execute() {
        if (!this.isValidUrl(location.href))
            return;
        this.fetch();
        this.checkStatUpdate();
        await LocalStorage.set(this._id, this._task);
    }
    fetch() {
        const taskName = document
            .querySelector('[role="main"]')
            ?.querySelector('h2')?.textContent;
        const className = (() => {
            const text = document.querySelector('.page-header-headings')
                ?.textContent;
            return text.slice(0, text.lastIndexOf(' '));
        })();
        const deadline = (() => {
            const dates = document.querySelectorAll('div[data-region="activity-dates"] > div');
            if (dates.length < 2) {
                return '---';
            }
            const rawDate = dates[1].textContent?.replace(/??????:|\s/g, '');
            const date = rawDate.split(/???|???|???\(\S??????\)/);
            const day = date.slice(0, 3).join('/');
            const time = date.slice(3).join();
            return day + ' ' + time;
        })();
        const assign = {
            taskName: taskName,
            className: className,
            type: 'assign',
            deadline: deadline,
            submissionState: '?????????',
        };
        this._task = assign;
    }
    checkStatUpdate() {
        if (!this._task)
            throw new Error('task is not defined.');
        const tbody = document
            .querySelector('.generaltable')
            .querySelector('tbody');
        const rawState = tbody?.children[0].querySelector('.c1')?.textContent;
        const buttonState = document.querySelector('div[data-region="completion-info"] > button.btn-outline-success');
        const submissionState = rawState.includes('????????????') || !!buttonState ? '????????????' : '?????????';
        this._task.submissionState = submissionState;
    }
}
class Quiz extends BaseTask {
    constructor(id) {
        super(id);
        this._disallowPaths = ['attempt.php', 'summary.php'];
    }
    async execute() {
        if (!this.isValidUrl(location.href))
            return;
        this.fetch();
        this.checkStatUpdate();
        await LocalStorage.set(this._id, this._task);
    }
    fetch() {
        const taskName = document
            .querySelector('[role="main"]')
            ?.querySelector('h2')?.textContent;
        const className = (() => {
            const text = document.querySelector('.page-header-headings')
                ?.textContent;
            return text.slice(0, text.lastIndexOf(' '));
        })();
        const deadline = (() => {
            const dates = document.querySelectorAll('div[data-region="activity-dates"] > div');
            if (dates.length < 2) {
                return '---';
            }
            const rawDate = dates[1].textContent?.replace(/??????(??????|??????)?:|\s/g, '');
            const date = rawDate.split(/???|???|???\(\S??????\)/);
            const day = date.slice(0, 3).join('/');
            const time = date.slice(3).join();
            return day + ' ' + time;
        })();
        const quiz = {
            taskName: taskName,
            className: className,
            type: 'quiz',
            deadline: deadline,
            submissionState: '?????????',
        };
        this._task = quiz;
    }
    checkStatUpdate() {
        if (!this._task)
            throw new Error('task is not defined.');
        if (/https:\/\/tlms.tsc.u-tokai.ac.jp\/mod\/quiz\/review.php\?attempt=\d+&cmid=\d+\S*/.test(location.href)) {
            this._task.submissionState = '????????????';
        }
        else {
            const table = document.querySelector('.generaltable');
            this._task.submissionState = !!table ? '????????????' : '?????????';
        }
    }
}
(async () => {
    await LMSManager.instance.execute();
})();
