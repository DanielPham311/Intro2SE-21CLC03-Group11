const controller = {};

controller.movie_detail = async (req, res, next) => {
    res.render('movieScreen', {
       layout: 'functional_layout',
       css_file_name: 'movieWatching' 
    });
}

controller.search = async (req, res) => {
    res.json(req.user);
}

module.exports = controller;