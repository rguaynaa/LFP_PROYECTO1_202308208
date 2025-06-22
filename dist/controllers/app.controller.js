"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.pensum = exports.analyze = exports.home = void 0;
const home = (req, res) => {
    resizeBy.render('pages/index');
};
exports.home = home;
const analyze = (req, res) => {
    const body = req.body;
    let scanner = new LexicalAnalize();
    let careers = [];
    if (scanner.getErrorList().length == 0) {
        careers = getCareers(scanner.getTokensList());
    }
    res.json({
        "tokens": scanner.getTokensList(),
        "errors": scanner.getErrorList(),
        "editor": scanner.getColors(),
        "careers": careers
    });
};
exports.analyze = analyze;
const pensum = (req, res) => {
    const num = req.params.id;
    console.log(num);
    res.render('pages/carrera', { num });
};
exports.pensum = pensum;
