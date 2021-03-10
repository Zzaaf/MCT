import fs from 'fs'
export default (req, res, next) => {
    if(typeof (req.file) === 'undefined' || typeof (req.body) === 'undefined') {
        return res.status(400).json({
            errors: 'Problem with sending data'
        })
    }

    // console.log(req.file);
    let name = req.body.name
    let image = req.file.path

    if (!(req.file.mimetype).includes('jpeg') && !(req.file.mimetype).includes('png') && !(req.file.mimetype).includes('jpg')) {
        fs.unlinkSync(image)
        return res.status(400).json({
            errors: 'File not support'
        })
    }

    // указываем максимальный размер загружаемого файла (3 мб)
    // if (req.size.file > 1024 * 1024 * 3) {
    //     fs.unlinkSync(image)
    //     return res.status(400).json({
    //         errors: 'File is too large'
    //     })
    // }

    // проверяем, если поле пусто
    // if (!name || !image) {
    //     return res.status(400).json({
    //         errors: 'All fields are requires'
    //     })
    // }
    next()
}