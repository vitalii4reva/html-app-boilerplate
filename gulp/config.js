const util = require('gulp-util');

const production = util.env.production || util.env.prod || false;
const distPath = 'dist';
const ftpCredentials = require('../ftp_credentials.json');

const config = {
    env       : 'development',
    production: production,

    outputCSS: 'app.css',

    src: {
        root         : 'app',
        templates    : 'app/templates',
        templatesData: 'app/templates/data',
        pagelist     : 'app/index.yaml',
        sass         : 'app/styles',
        // path for sass files that will be generated automatically via some of tasks
        sassGen      : 'app/sass/generated',
        scripts      : 'app/scripts',
        img          : 'app/images',
        svg          : 'app/images/svg',
        icons        : 'app/icons',
        // path to png sources for sprite:png task
        iconsPng     : 'app/icons',
        // path to svg sources for sprite:svg task
        iconsSvg     : 'app/icons',
        // path to svg sources for iconfont task
        iconsFont    : 'app/icons',
        fonts        : 'app/fonts',
        lib          : 'app/lib',
        static       : 'static'
    },
    dest: {
        root    : distPath,
        html    : distPath,
        css     : distPath + '/styles',
        scripts : distPath + '/scripts',
        img     : distPath + '/images',
        fonts   : distPath + '/fonts',
        lib     : distPath + '/lib'
    },
    ftp: {
      user            : 'zenwaycode_' + ftpCredentials.user,
      password        : ftpCredentials.password,
      host            : ftpCredentials.host,
      port            : 21,
      localFilesGlob  : [
        './images/**',
        './styles/**',
        './scripts/**',
        './fonts/**',
        './*'
      ],
      remoteFolder    : '/public_html'
    },

    setEnv: function(env) {
        if (typeof env !== 'string') return;
        this.env = env;
        this.production = env === 'production';
        process.env.NODE_ENV = env;
    },

    logEnv: function() {
        util.log(
            'Environment:',
            util.colors.white.bgRed(' ' + process.env.NODE_ENV + ' ')
        );
    },

    errorHandler: require('./util/handle-errors')
};

config.setEnv(production ? 'production' : 'development');

module.exports = config;
