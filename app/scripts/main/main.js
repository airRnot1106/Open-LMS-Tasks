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
        console.log('start');
        const url = location.href;
        if (!this.isAllowUrl(url))
            return;
        const id = this.extractId(url);
        const cachesData = await LocalStorage.get();
        const [, , , , type] = url.split('/');
        let taskObj;
        if (cachesData.hasOwnProperty(id)) {
            taskObj = JSON.parse(cachesData[id]);
        }
        else {
            switch (type) {
                case 'assign':
                    taskObj = this.fetchAssignData();
                    break;
                case 'quiz':
                    taskObj = this.fetchQuizData();
                    break;
            }
        }
        if (!taskObj) {
            return;
        }
        this.checkStatUpdate(taskObj);
        await LocalStorage.set(id, taskObj);
    }
    isAllowUrl(url) {
        let isValid = false;
        for (const path of this._allowPaths) {
            if (url.endsWith(path)) {
                isValid = true;
            }
        }
        if (!isNaN(url.slice(-1))) {
            isValid = true;
        }
        return isValid;
    }
    extractId(url) {
        const [, id] = url.split(/id=|&/);
        return id;
    }
    fetchAssignData() {
        const taskName = document
            .querySelector('[role="main"]')
            ?.querySelector('h2')?.textContent;
        console.log(taskName);
        const className = (() => {
            const text = document.querySelector('.page-header-headings')
                ?.textContent;
            return text.slice(0, text.lastIndexOf(' '));
        })();
        console.log(className);
        const deadline = (() => {
            const tbody = document
                .querySelector('.generaltable')
                .querySelector('tbody');
            const rawDate = tbody?.children[2].querySelector('td')?.textContent;
            const date = rawDate.split(/年 |月 |日\(\S曜日\) /);
            const day = date.slice(0, 3).join('/');
            const time = date.slice(3).join();
            return day + ' ' + time;
        })();
        const submissionState = (() => {
            const tbody = document
                .querySelector('.generaltable')
                .querySelector('tbody');
            const rawState = tbody?.children[0].querySelector('.c1')?.textContent;
            return rawState.includes('提出済み') ? '提出済み' : '未提出';
        })();
        const assign = {
            taskName: taskName,
            className: className,
            type: 'assign',
            deadline: deadline,
            submissionState: submissionState,
        };
        return assign;
    }
    fetchQuizData() {
        const taskName = document
            .querySelector('[role="main"]')
            ?.querySelector('h2')?.textContent;
        console.log(taskName);
        const className = (() => {
            const text = document.querySelector('.page-header-headings')
                ?.textContent;
            return text.slice(0, text.lastIndexOf(' '));
        })();
        console.log(className);
        const deadline = (() => {
            const info = document.querySelector('.quizinfo');
            const index = info.children.length - 2;
            const rawDate = info.children[index].textContent;
            const date = rawDate.split(/この小テストは |年 |月 |日\(\S曜日\) | に終了しま\S*/);
            const day = date.slice(1, 4).join('/');
            const time = date.slice(4, 5).join();
            return day + ' ' + time;
        })();
        const submissionState = (() => {
            const tbody = document
                .querySelector('.generaltable')
                .querySelector('tbody');
            const rawState = tbody?.children[0].querySelector('.c1')?.textContent;
            return rawState.includes('終了') ? '提出済み' : '未提出';
        })();
        const quiz = {
            taskName: taskName,
            className: className,
            type: 'quiz',
            deadline: deadline,
            submissionState: submissionState,
        };
        return quiz;
    }
    checkStatUpdate(task) {
        const tbody = document
            .querySelector('.generaltable')
            .querySelector('tbody');
        const rawState = tbody?.children[0].querySelector('.c1')?.textContent;
        const submissionState = rawState.includes('提出済み') || rawState.includes('終了')
            ? '提出済み'
            : '未提出';
        task.submissionState = submissionState;
    }
}
(async () => {
    await LMSManager.instance.execute();
})();