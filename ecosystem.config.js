module.exports = {
    apps: [{
        name: 'carousel',
        script: './server/index.js',
    }],
    deploy: {
        production: {
            user: 'ubuntu',
            host: 'ec2-18-223-132-37.us-east-2.compute.amazonaws.com',
            key: '~/.ssh/sdc-carousel.pem',
            ref: 'origin/master',
            repo: 'git@github.com:sole-hr/carousel-ken.git',
            path: '/home/ubuntu/carousel',
            'post-deploy': 'npm install && pm2 startOrRestart ecosystem.config.js'
        }
    }
}