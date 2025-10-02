var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g = Object.create((typeof Iterator === "function" ? Iterator : Object).prototype);
    return g.next = verb(0), g["throw"] = verb(1), g["return"] = verb(2), typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (g && (g = 0, op[0] && (_ = 0)), _) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
var __spreadArray = (this && this.__spreadArray) || function (to, from, pack) {
    if (pack || arguments.length === 2) for (var i = 0, l = from.length, ar; i < l; i++) {
        if (ar || !(i in from)) {
            if (!ar) ar = Array.prototype.slice.call(from, 0, i);
            ar[i] = from[i];
        }
    }
    return to.concat(ar || Array.prototype.slice.call(from));
};
var _this = this;
var numberOfGames = 0;
var dashboard = document.querySelector('.dashboard');
var activityLog = document.querySelector('.activity-log');
var Reward = document.querySelector('.rewards');
var games = ['Word chain', 'Treasure Hunt'];
var logs = [];
window.onload = function () { return __awaiter(_this, void 0, void 0, function () {
    var i, card;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0: return [4 /*yield*/, fetchAvailableGames()];
            case 1:
                _a.sent();
                dashboard.innerHTML = ''; // Clear existing cards before adding new ones
                for (i = 0; i < numberOfGames; i++) {
                    card = "\n  <div class=\"available-triva\">\n    <div class=\"trivia-card\">\n      <img src=\"https://picsum.photos/400/200?random=".concat(i, "\" alt=\"General Knowledge\">\n      <h3>\uD83C\uDFAF ").concat(games[i], "</h3>\n      <p>Players: ").concat(0, "</p>\n      <button>Join Game</button>\n    </div>\n  </div>\n");
                    dashboard.innerHTML += card;
                }
                displayBoxes();
                return [2 /*return*/];
        }
    });
}); };
function displayBoxes() {
    return __awaiter(this, void 0, void 0, function () {
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, getLogs()];
                case 1:
                    _a.sent();
                    dashboard.innerHTML += "\n    <!-- Activity Log -->\n    <div class=\"activity-log\">\n      <h4>\uD83D\uDCDD Recent Activity</h4>\n      <ul>\n        ".concat(logs.map(function (value) { return "<li>".concat(value, "</li>"); }).join(""), "\n      </ul>\n    </div>\n\n    <!-- Rewards Section -->\n    <div class=\"rewards\">\n      <h4>\uD83C\uDFC6 Level Up Rewards</h4>\n      <div class=\"level-circle\">Lv 5</div>\n      <p>Keep playing to unlock new rewards and achievements!</p>\n      <button class=\"reward-btn\"><i class=\"fa-solid fa-gift\"></i> Claim Reward</button>\n    </div>\n    ");
                    return [2 /*return*/];
            }
        });
    });
}
function fetchAvailableGames() {
    return __awaiter(this, void 0, void 0, function () {
        var res, data, e_1;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    _a.trys.push([0, 3, , 4]);
                    return [4 /*yield*/, fetch('/api/get-available-games')];
                case 1:
                    res = _a.sent();
                    return [4 /*yield*/, res.json()];
                case 2:
                    data = _a.sent();
                    // Make sure the field exists and is a number
                    if (typeof data.data.data === 'number') {
                        numberOfGames = data.data.data;
                    }
                    else {
                        throw new Error('Invalid data format');
                    }
                    return [3 /*break*/, 4];
                case 3:
                    e_1 = _a.sent();
                    alert('Failed to fetch games: ' + e_1.message);
                    return [3 /*break*/, 4];
                case 4: return [2 /*return*/];
            }
        });
    });
}
function getLogs() {
    return __awaiter(this, void 0, void 0, function () {
        var res, data, e_2;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    _a.trys.push([0, 3, , 4]);
                    return [4 /*yield*/, fetch('/api/logs')];
                case 1:
                    res = _a.sent();
                    return [4 /*yield*/, res.json()];
                case 2:
                    data = _a.sent();
                    logs.splice.apply(logs, __spreadArray([0, logs.length], data.log, false)); // replace with fresh logs
                    return [3 /*break*/, 4];
                case 3:
                    e_2 = _a.sent();
                    alert('Failed to fetch games: ' + e_2.message);
                    return [3 /*break*/, 4];
                case 4: return [2 /*return*/];
            }
        });
    });
}
