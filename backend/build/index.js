"use strict";
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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = __importDefault(require("express"));
var cors_1 = __importDefault(require("cors"));
var multer_1 = __importDefault(require("multer"));
var db_1 = __importDefault(require("./db"));
var app = (0, express_1.default)();
var port = 4000;
app.use((0, cors_1.default)());
app.use(express_1.default.json());
app.post("/login", function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var _a, roll, password, db, rows, err_1;
    return __generator(this, function (_b) {
        switch (_b.label) {
            case 0:
                _b.trys.push([0, 3, , 4]);
                _a = req.body, roll = _a.roll, password = _a.password;
                if (!roll || !password) {
                    return [2 /*return*/, res.status(400).json({ error: "Roll and password required" })];
                }
                return [4 /*yield*/, (0, db_1.default)()];
            case 1:
                db = _b.sent();
                return [4 /*yield*/, db.execute("SELECT * FROM login_info WHERE roll = ? AND password = ?", [roll, password])];
            case 2:
                rows = (_b.sent())[0];
                if (rows.length === 0) {
                    return [2 /*return*/, res.status(401).json({ error: "Invalid roll or password" })];
                }
                res.json({ success: true, roll: rows[0].roll });
                return [3 /*break*/, 4];
            case 3:
                err_1 = _b.sent();
                console.error(err_1);
                res.status(500).json({ error: "Server error" });
                return [3 /*break*/, 4];
            case 4: return [2 /*return*/];
        }
    });
}); });
// home route
app.get("/", function (req, res) {
    res.send("hello");
});
// GET students data
app.get("/students", function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var _a, roll, course, db, rows, avgResult, err_2;
    return __generator(this, function (_b) {
        switch (_b.label) {
            case 0:
                _b.trys.push([0, 4, , 5]);
                _a = req.query, roll = _a.roll, course = _a.course;
                console.log("roll:", roll);
                console.log("course:", course);
                if (!roll || !course) {
                    return [2 /*return*/, res.status(400).json({ error: "roll and course required" })];
                }
                return [4 /*yield*/, (0, db_1.default)()];
            case 1:
                db = _b.sent();
                return [4 /*yield*/, db.query("SELECT marking_date, marks, attendance,file_name\n FROM marks \n WHERE roll = ? AND course_code = ?\n ORDER BY marking_date", [roll, course])];
            case 2:
                rows = (_b.sent())[0];
                console.log("rows length:", rows.length);
                console.log("rows:", rows);
                return [4 /*yield*/, db.query("SELECT AVG(marks) as avgMarks,SUM(attendance)*100/COUNT(*) as avgAttendance\n FROM marks \n WHERE roll = ? AND course_code = ?\n ", [roll, course])];
            case 3:
                avgResult = (_b.sent())[0];
                console.log("avgResult:", avgResult);
                res.json({
                    students: rows,
                    avgMarks: parseFloat(avgResult[0].avgMarks).toFixed(2) || 0,
                    avgAttendance: parseFloat(avgResult[0].avgAttendance).toFixed(0) || 0
                });
                return [3 /*break*/, 5];
            case 4:
                err_2 = _b.sent();
                console.error(err_2);
                res.status(500).json({ error: "Server error" });
                return [3 /*break*/, 5];
            case 5: return [2 /*return*/];
        }
    });
}); });
var upload = (0, multer_1.default)({
    storage: multer_1.default.memoryStorage(),
    limits: { fileSize: 20 * 1024 * 1024 },
    fileFilter: function (req, file, cb) {
        if (file.mimetype === "application/pdf") {
            cb(null, true);
        }
        else {
            cb(new Error("Only PDF files are allowed!"));
        }
    }
});
// Upload route
app.post("/upload", upload.single("pdf"), function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var roll, courseCode, markingDate, db, rows, err_3;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                _a.trys.push([0, 4, , 5]);
                if (!req.file) {
                    return [2 /*return*/, res.status(400).json({ error: "No file uploaded" })];
                }
                roll = req.body.roll;
                courseCode = req.body.course;
                markingDate = req.body.reportDate;
                if (!markingDate) {
                    return [2 /*return*/, res.status(400).json({ error: "Report date is required" })];
                }
                return [4 /*yield*/, (0, db_1.default)()];
            case 1:
                db = _a.sent();
                return [4 /*yield*/, db.execute("SELECT marking_date FROM marks WHERE roll = ? AND course_code = ? AND marking_date = ?", [roll, courseCode, markingDate])];
            case 2:
                rows = (_a.sent())[0];
                if (rows.length === 0) {
                    return [2 /*return*/, res.status(400).json({
                            error: "Invalid date! ".concat(markingDate, " is not a valid marking date.")
                        })];
                }
                return [4 /*yield*/, db.execute("UPDATE marks SET file_name = ?, file_data = ?, uploaded_at = CURRENT_TIMESTAMP\n   WHERE roll = ? AND course_code = ? AND marking_date = ?", [req.file.originalname, req.file.buffer, roll, courseCode, markingDate])];
            case 3:
                _a.sent();
                /* const query = `
                   INSERT INTO ${tableName}
               (course_code, file_name, file_data, marking_date)
               VALUES (?, ?, ?, ?)
               ON DUPLICATE KEY UPDATE
                 file_name = VALUES(file_name),
                 file_data = VALUES(file_data)
                 `;
             
                 await db.execute(query, [
                   courseCode,
                   req.file.originalname,
                   req.file.buffer,
                   markingDate
                 ]);*/
                console.log("PDF Saved | Course: ".concat(courseCode, " | Date: ").concat(markingDate));
                res.json({
                    success: true,
                    message: "PDF saved successfully",
                    courseCode: courseCode,
                    markingDate: markingDate
                });
                return [3 /*break*/, 5];
            case 4:
                err_3 = _a.sent();
                console.error("❌ Upload Error:", err_3.message);
                res.status(500).json({
                    error: "Failed to save PDF in database",
                    details: err_3.message
                });
                return [3 /*break*/, 5];
            case 5: return [2 /*return*/];
        }
    });
}); });
app.listen(port, function () {
    console.log("server running on port ".concat(port));
});
//# sourceMappingURL=index.js.map