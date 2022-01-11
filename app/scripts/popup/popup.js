/******/ (() => { // webpackBootstrap
/******/ 	var __webpack_modules__ = ({

/***/ "./node_modules/dayjs/dayjs.min.js":
/*!*****************************************!*\
  !*** ./node_modules/dayjs/dayjs.min.js ***!
  \*****************************************/
/***/ (function(module) {

!function(t,e){ true?module.exports=e():0}(this,(function(){"use strict";var t=1e3,e=6e4,n=36e5,r="millisecond",i="second",s="minute",u="hour",a="day",o="week",f="month",h="quarter",c="year",d="date",$="Invalid Date",l=/^(\d{4})[-/]?(\d{1,2})?[-/]?(\d{0,2})[Tt\s]*(\d{1,2})?:?(\d{1,2})?:?(\d{1,2})?[.:]?(\d+)?$/,y=/\[([^\]]+)]|Y{1,4}|M{1,4}|D{1,2}|d{1,4}|H{1,2}|h{1,2}|a|A|m{1,2}|s{1,2}|Z{1,2}|SSS/g,M={name:"en",weekdays:"Sunday_Monday_Tuesday_Wednesday_Thursday_Friday_Saturday".split("_"),months:"January_February_March_April_May_June_July_August_September_October_November_December".split("_")},m=function(t,e,n){var r=String(t);return!r||r.length>=e?t:""+Array(e+1-r.length).join(n)+t},g={s:m,z:function(t){var e=-t.utcOffset(),n=Math.abs(e),r=Math.floor(n/60),i=n%60;return(e<=0?"+":"-")+m(r,2,"0")+":"+m(i,2,"0")},m:function t(e,n){if(e.date()<n.date())return-t(n,e);var r=12*(n.year()-e.year())+(n.month()-e.month()),i=e.clone().add(r,f),s=n-i<0,u=e.clone().add(r+(s?-1:1),f);return+(-(r+(n-i)/(s?i-u:u-i))||0)},a:function(t){return t<0?Math.ceil(t)||0:Math.floor(t)},p:function(t){return{M:f,y:c,w:o,d:a,D:d,h:u,m:s,s:i,ms:r,Q:h}[t]||String(t||"").toLowerCase().replace(/s$/,"")},u:function(t){return void 0===t}},D="en",v={};v[D]=M;var p=function(t){return t instanceof _},S=function(t,e,n){var r;if(!t)return D;if("string"==typeof t)v[t]&&(r=t),e&&(v[t]=e,r=t);else{var i=t.name;v[i]=t,r=i}return!n&&r&&(D=r),r||!n&&D},w=function(t,e){if(p(t))return t.clone();var n="object"==typeof e?e:{};return n.date=t,n.args=arguments,new _(n)},O=g;O.l=S,O.i=p,O.w=function(t,e){return w(t,{locale:e.$L,utc:e.$u,x:e.$x,$offset:e.$offset})};var _=function(){function M(t){this.$L=S(t.locale,null,!0),this.parse(t)}var m=M.prototype;return m.parse=function(t){this.$d=function(t){var e=t.date,n=t.utc;if(null===e)return new Date(NaN);if(O.u(e))return new Date;if(e instanceof Date)return new Date(e);if("string"==typeof e&&!/Z$/i.test(e)){var r=e.match(l);if(r){var i=r[2]-1||0,s=(r[7]||"0").substring(0,3);return n?new Date(Date.UTC(r[1],i,r[3]||1,r[4]||0,r[5]||0,r[6]||0,s)):new Date(r[1],i,r[3]||1,r[4]||0,r[5]||0,r[6]||0,s)}}return new Date(e)}(t),this.$x=t.x||{},this.init()},m.init=function(){var t=this.$d;this.$y=t.getFullYear(),this.$M=t.getMonth(),this.$D=t.getDate(),this.$W=t.getDay(),this.$H=t.getHours(),this.$m=t.getMinutes(),this.$s=t.getSeconds(),this.$ms=t.getMilliseconds()},m.$utils=function(){return O},m.isValid=function(){return!(this.$d.toString()===$)},m.isSame=function(t,e){var n=w(t);return this.startOf(e)<=n&&n<=this.endOf(e)},m.isAfter=function(t,e){return w(t)<this.startOf(e)},m.isBefore=function(t,e){return this.endOf(e)<w(t)},m.$g=function(t,e,n){return O.u(t)?this[e]:this.set(n,t)},m.unix=function(){return Math.floor(this.valueOf()/1e3)},m.valueOf=function(){return this.$d.getTime()},m.startOf=function(t,e){var n=this,r=!!O.u(e)||e,h=O.p(t),$=function(t,e){var i=O.w(n.$u?Date.UTC(n.$y,e,t):new Date(n.$y,e,t),n);return r?i:i.endOf(a)},l=function(t,e){return O.w(n.toDate()[t].apply(n.toDate("s"),(r?[0,0,0,0]:[23,59,59,999]).slice(e)),n)},y=this.$W,M=this.$M,m=this.$D,g="set"+(this.$u?"UTC":"");switch(h){case c:return r?$(1,0):$(31,11);case f:return r?$(1,M):$(0,M+1);case o:var D=this.$locale().weekStart||0,v=(y<D?y+7:y)-D;return $(r?m-v:m+(6-v),M);case a:case d:return l(g+"Hours",0);case u:return l(g+"Minutes",1);case s:return l(g+"Seconds",2);case i:return l(g+"Milliseconds",3);default:return this.clone()}},m.endOf=function(t){return this.startOf(t,!1)},m.$set=function(t,e){var n,o=O.p(t),h="set"+(this.$u?"UTC":""),$=(n={},n[a]=h+"Date",n[d]=h+"Date",n[f]=h+"Month",n[c]=h+"FullYear",n[u]=h+"Hours",n[s]=h+"Minutes",n[i]=h+"Seconds",n[r]=h+"Milliseconds",n)[o],l=o===a?this.$D+(e-this.$W):e;if(o===f||o===c){var y=this.clone().set(d,1);y.$d[$](l),y.init(),this.$d=y.set(d,Math.min(this.$D,y.daysInMonth())).$d}else $&&this.$d[$](l);return this.init(),this},m.set=function(t,e){return this.clone().$set(t,e)},m.get=function(t){return this[O.p(t)]()},m.add=function(r,h){var d,$=this;r=Number(r);var l=O.p(h),y=function(t){var e=w($);return O.w(e.date(e.date()+Math.round(t*r)),$)};if(l===f)return this.set(f,this.$M+r);if(l===c)return this.set(c,this.$y+r);if(l===a)return y(1);if(l===o)return y(7);var M=(d={},d[s]=e,d[u]=n,d[i]=t,d)[l]||1,m=this.$d.getTime()+r*M;return O.w(m,this)},m.subtract=function(t,e){return this.add(-1*t,e)},m.format=function(t){var e=this,n=this.$locale();if(!this.isValid())return n.invalidDate||$;var r=t||"YYYY-MM-DDTHH:mm:ssZ",i=O.z(this),s=this.$H,u=this.$m,a=this.$M,o=n.weekdays,f=n.months,h=function(t,n,i,s){return t&&(t[n]||t(e,r))||i[n].substr(0,s)},c=function(t){return O.s(s%12||12,t,"0")},d=n.meridiem||function(t,e,n){var r=t<12?"AM":"PM";return n?r.toLowerCase():r},l={YY:String(this.$y).slice(-2),YYYY:this.$y,M:a+1,MM:O.s(a+1,2,"0"),MMM:h(n.monthsShort,a,f,3),MMMM:h(f,a),D:this.$D,DD:O.s(this.$D,2,"0"),d:String(this.$W),dd:h(n.weekdaysMin,this.$W,o,2),ddd:h(n.weekdaysShort,this.$W,o,3),dddd:o[this.$W],H:String(s),HH:O.s(s,2,"0"),h:c(1),hh:c(2),a:d(s,u,!0),A:d(s,u,!1),m:String(u),mm:O.s(u,2,"0"),s:String(this.$s),ss:O.s(this.$s,2,"0"),SSS:O.s(this.$ms,3,"0"),Z:i};return r.replace(y,(function(t,e){return e||l[t]||i.replace(":","")}))},m.utcOffset=function(){return 15*-Math.round(this.$d.getTimezoneOffset()/15)},m.diff=function(r,d,$){var l,y=O.p(d),M=w(r),m=(M.utcOffset()-this.utcOffset())*e,g=this-M,D=O.m(this,M);return D=(l={},l[c]=D/12,l[f]=D,l[h]=D/3,l[o]=(g-m)/6048e5,l[a]=(g-m)/864e5,l[u]=g/n,l[s]=g/e,l[i]=g/t,l)[y]||g,$?D:O.a(D)},m.daysInMonth=function(){return this.endOf(f).$D},m.$locale=function(){return v[this.$L]},m.locale=function(t,e){if(!t)return this.$L;var n=this.clone(),r=S(t,e,!0);return r&&(n.$L=r),n},m.clone=function(){return O.w(this.$d,this)},m.toDate=function(){return new Date(this.valueOf())},m.toJSON=function(){return this.isValid()?this.toISOString():null},m.toISOString=function(){return this.$d.toISOString()},m.toString=function(){return this.$d.toUTCString()},M}(),b=_.prototype;return w.prototype=b,[["$ms",r],["$s",i],["$m",s],["$H",u],["$W",a],["$M",f],["$y",c],["$D",d]].forEach((function(t){b[t[1]]=function(e){return this.$g(e,t[0],t[1])}})),w.extend=function(t,e){return t.$i||(t(e,_,w),t.$i=!0),w},w.locale=S,w.isDayjs=p,w.unix=function(t){return w(1e3*t)},w.en=v[D],w.Ls=v,w.p={},w}));

/***/ }),

/***/ "./node_modules/dayjs/plugin/isSameOrAfter.js":
/*!****************************************************!*\
  !*** ./node_modules/dayjs/plugin/isSameOrAfter.js ***!
  \****************************************************/
/***/ (function(module) {

!function(e,t){ true?module.exports=t():0}(this,(function(){"use strict";return function(e,t){t.prototype.isSameOrAfter=function(e,t){return this.isSame(e,t)||this.isAfter(e,t)}}}));

/***/ }),

/***/ "./src/popup/popup.ts":
/*!****************************!*\
  !*** ./src/popup/popup.ts ***!
  \****************************/
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {

"use strict";

var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", ({ value: true }));
const dayjs_1 = __importDefault(__webpack_require__(/*! dayjs */ "./node_modules/dayjs/dayjs.min.js"));
const isSameOrAfter_1 = __importDefault(__webpack_require__(/*! dayjs/plugin/isSameOrAfter */ "./node_modules/dayjs/plugin/isSameOrAfter.js"));
dayjs_1.default.extend(isSameOrAfter_1.default);
class LocalStorage {
    static async get() {
        const storageData = await this.fetch();
        const parsedJsonData = Object.entries(storageData).map(([, taskObj]) => {
            return JSON.parse(taskObj);
        });
        return parsedJsonData;
    }
    static async getRaw() {
        const storageData = await this.fetch();
        return storageData;
    }
    static async fetch() {
        return new Promise((resolve) => {
            chrome.storage.local.get((data) => {
                resolve(data);
            });
        });
    }
    static async set(item) {
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
    static toArray(taskObj) {
        return [
            taskObj.taskName,
            taskObj.className,
            taskObj.type,
            taskObj.deadline,
            taskObj.submissionState,
        ];
    }
    static toArrays(taskObjs) {
        return taskObjs.map((taskObj) => {
            return this.toArray(taskObj);
        });
    }
}
class ElementAction {
    static expand(element) {
        if (element.childElementCount) {
            const els = Array.from(element.children).map((child) => {
                return this.expand(child);
            });
            return [element, ...els.flat()];
        }
        else {
            return [element];
        }
    }
}
class TaskList {
    static _instance;
    _categoryButton;
    _menu;
    _categoryState;
    _pages;
    _currentPage;
    _isAllShow;
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
    async updateCategoryState(btnId) {
        this._categoryState = btnId;
        this._currentPage = 0;
        await this.categorize();
    }
    updateCurrentPage(moving) {
        this._currentPage += moving;
        if (this._currentPage < 0) {
            this._currentPage = 0;
        }
        if (this._currentPage > this._pages.length - 1) {
            this._currentPage = this._pages.length - 1;
        }
        this.refreshTable();
    }
    async updateIsAllShow(isAllShow) {
        this._isAllShow = isAllShow;
        this._currentPage = 0;
        await this.categorize();
    }
    updateMenuDisplay(isShow) {
        const menu = document.getElementById('menu');
        const menuBtn = document.getElementById('menuBtn');
        if (isShow) {
            menu.classList.remove('hidden');
            menuBtn.checked = true;
        }
        else {
            menu.classList.add('hidden');
            menuBtn.checked = false;
        }
    }
    async resetTaskData() {
        await this._menu.reset();
    }
    async importTaskData(file) {
        await this._menu.import(file);
    }
    async exportTaskData() {
        await this._menu.export();
    }
    async categorize() {
        this._categoryButton.changeButtonState(this._categoryState);
        const storageData = await LocalStorage.get();
        const filteredData = this.filterStorageData(storageData);
        const sortedData = this.sort(Task.toArrays(filteredData));
        this.paginate(sortedData);
        if (!this._isAllShow && this._categoryButton.state !== 2) {
            this.purgePage();
        }
        this.refreshTable();
        this.showBadge();
    }
    filterStorageData(storageData) {
        let categorizedData = [];
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
    sort(tableRows) {
        tableRows.sort((a, b) => {
            const first = (0, dayjs_1.default)(a[3]);
            const second = (0, dayjs_1.default)(b[3]);
            if (first.isAfter(second)) {
                return 1;
            }
            else {
                return -1;
            }
        });
        return tableRows;
    }
    paginate(tableRows) {
        const paginatedData = [];
        let page = [];
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
    purgePage() {
        if (!this._pages.length)
            return;
        const purgeIndices = [];
        this._pages.forEach((page, index) => {
            const submitted = page.filter((rowData) => {
                return rowData[4] === '提出済み';
            });
            if (submitted.length === 8) {
                purgeIndices.push(index);
            }
        });
        this._pages = this._pages.filter((_page, index) => {
            console.log(purgeIndices);
            return !purgeIndices.includes(index);
        });
    }
    refreshTable() {
        const newTableRows = this._pages[this._currentPage];
        const table = document.querySelector('tbody');
        table.innerHTML = '';
        if (!newTableRows)
            return;
        for (const rowData of newTableRows) {
            const newRow = table.insertRow();
            for (const cellData of rowData) {
                const newCell = newRow.insertCell();
                newCell.appendChild(document.createTextNode(cellData));
                newCell.classList.add('border', 'px-2', 'text-left');
            }
        }
    }
    async showBadge() {
        const storageData = await LocalStorage.get();
        const deadlineTasks = storageData.filter((task) => {
            return (task.submissionState === '未提出' &&
                (0, dayjs_1.default)(task.deadline).diff((0, dayjs_1.default)()) / 1000 < 172800);
        });
        if (!deadlineTasks.length) {
            await chrome.action.setBadgeText({ text: '' });
            return;
        }
        await chrome.action.setBadgeText({
            text: deadlineTasks.length.toString(),
        });
        await chrome.action.setBadgeBackgroundColor({ color: '#E13636' });
    }
    showDate() {
        const date = (0, dayjs_1.default)().format('YYYY/MM/DD HH:mm:ss');
        const element = document.getElementById('date');
        element.textContent = '最終更新: ' + date;
    }
}
class CategoryButton {
    static _instance;
    _state;
    constructor() {
        this._state = 0;
    }
    static get instance() {
        if (!this._instance) {
            this._instance = new CategoryButton();
        }
        return this._instance;
    }
    get state() {
        return this._state;
    }
    changeButtonState(btnId) {
        this._state = btnId;
        const catButtonsList = document.getElementById('catButtons')?.childNodes;
        const catButtonsArray = [];
        catButtonsList?.forEach((value, index, list) => {
            if (index === 0 || index === list.length - 1)
                return;
            catButtonsArray.push(value);
        });
        this.clearClass(catButtonsArray);
        this.activeClass(catButtonsArray);
    }
    clearClass(catButtons) {
        for (const catButton of catButtons) {
            catButton.classList.remove('border-blue-400', 'bg-blue-300', 'hover:bg-blue-100');
        }
    }
    activeClass(catButtons) {
        for (let i = 0; i < catButtons.length; i++) {
            if (i === this._state) {
                catButtons[i].classList.add('border-blue-400', 'bg-blue-300');
            }
            else {
                catButtons[i].classList.add('hover:bg-blue-100');
            }
        }
    }
}
class Menu {
    static _instance;
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
    async import(content) {
        try {
            const parsedData = JSON.parse(content);
            await LocalStorage.reset();
            await LocalStorage.set(parsedData);
            await TaskList.instance.updateCategoryState(0);
        }
        catch (error) {
            alert(error);
        }
    }
    async export() {
        const content = await LocalStorage.getRaw();
        const blob = new Blob([JSON.stringify(content)], {
            type: 'text/plane',
        });
        const link = document.getElementById('exportLink');
        link.href = window.URL.createObjectURL(blob);
        link.download = (0, dayjs_1.default)().format('YYYYMMDDHHmmss') + '.olt';
    }
}
(async () => {
    TaskList.instance.showDate();
    await TaskList.instance.updateCategoryState(0);
})();
document.getElementById('catBtn0')?.addEventListener('click', async () => {
    await TaskList.instance.updateCategoryState(0);
}, false);
document.getElementById('catBtn1')?.addEventListener('click', async () => {
    await TaskList.instance.updateCategoryState(1);
}, false);
document.getElementById('catBtn2')?.addEventListener('click', async () => {
    await TaskList.instance.updateCategoryState(2);
}, false);
document.getElementById('prev')?.addEventListener('click', async () => {
    TaskList.instance.updateCurrentPage(-1);
}, false);
document.getElementById('next')?.addEventListener('click', async () => {
    TaskList.instance.updateCurrentPage(1);
}, false);
document.getElementById('toggle')?.addEventListener('click', async (e) => {
    TaskList.instance.updateIsAllShow(e.currentTarget.checked);
});
document.getElementById('resetBtn')?.addEventListener('click', async () => {
    await TaskList.instance.resetTaskData();
}, false);
document.getElementById('importLink')?.addEventListener('change', (e) => {
    const files = e.currentTarget.files;
    if (!files)
        return;
    const target = files[0];
    if (!target.name.endsWith('.olt')) {
        alert('ファイルの形式が正しくありません');
        return;
    }
    const reader = new FileReader();
    reader.readAsText(target, 'utf-8');
    reader.onload = () => {
        TaskList.instance.importTaskData(reader.result);
    };
});
document.getElementById('menuBtn')?.addEventListener('click', (e) => {
    TaskList.instance.updateMenuDisplay(e.currentTarget.checked);
});
document.getElementById('openLmsLink')?.addEventListener('click', async (e) => {
    await chrome.tabs.create({
        active: true,
        url: e.currentTarget.href,
    });
}, false);
document.addEventListener('click', (e) => {
    const menuBtnLabel = document.getElementById('menuBtnLabel');
    const menu = document.getElementById('menu');
    const els = [
        ...ElementAction.expand(menuBtnLabel),
        ...ElementAction.expand(menu),
    ];
    let isValid = false;
    for (const el of els) {
        if (e.target.isEqualNode(el)) {
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


/***/ })

/******/ 	});
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		var cachedModule = __webpack_module_cache__[moduleId];
/******/ 		if (cachedModule !== undefined) {
/******/ 			return cachedModule.exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			// no module.id needed
/******/ 			// no module.loaded needed
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		__webpack_modules__[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/************************************************************************/
/******/ 	
/******/ 	// startup
/******/ 	// Load entry module and return exports
/******/ 	// This entry module is referenced by other modules so it can't be inlined
/******/ 	var __webpack_exports__ = __webpack_require__("./src/popup/popup.ts");
/******/ 	
/******/ })()
;