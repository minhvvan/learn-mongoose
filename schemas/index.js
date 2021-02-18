const mongoose = require('mongoose');
const dbConfig = require('../config/key')

const connect = () => {
    if (process.env.NODE_ENV !== 'production'){
        mongoose.set('debug', true)
    }

    mongoose.connect(dbConfig.MongoURI, {
        dbName: 'nodejs',
        useNewUrlParser: true,
        useCreateIndex: true,
    },(error) => {
        if(error){
            console.log('몽고디비 연결 에러', error)
        }else{
            console.log('몽고디비 연결 성공')
        }
    });
};

mongoose.connection.on('error', (err) => {
    console.error('몽고디비 연결에러', err);
});

mongoose.connection.on('disconneted', () => {
    console.error('몽고디비 연결이 끊겼습니다. 연결을 재시도합니다.',);
    connet();
});

module.exports = connect;

