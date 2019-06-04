module.exports = {
    apps: [{
        name: 'carousel',
        script: './server/index.js',
    }],
    deploy: {
        production: {
            user: 'ubuntu',
            host: 'ec2-3-88-248-205.compute-1.amazonaws.com',
            key: '~/.ssh/fec.pem',
            ref: 'origin/master',
            repo: 'git@github.com:nike-hratx41-fec/carousel.git',
            path: '/home/ubuntu/carousel',
            'post-deploy': 'npm install && pm2 startOrRestart ecosystem.config.js'
        }
    }
}