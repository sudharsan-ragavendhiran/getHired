import 'dotenv/config';

import {
    S3Client,
    PutObjectCommand,
    GetObjectCommand,
    DeleteObjectCommand
}  from '@aws-sdk/client-s3';

//required for local machine
import {
    fromIni
}  from "@aws-sdk/credential-provider-ini";
const region = 'us-east-1';
const s3 = new S3Client({
    region,
    credentials: fromIni({
        profile: 'info6150'
    })
});

// const fs = require('fs');
import fs from 'fs';

 
const bucketName = process.env.S3_BUCKETNAME;

// uploads a file to s3
export function uploadFile(file,key) {
    const fileStream = fs.createReadStream(file.path)
    const uploadParams = {
        Bucket: bucketName,
        Body: fileStream,
        Key: key
    }
    return s3.send(new PutObjectCommand(uploadParams))
}

export function getFile(key) {
    console.log("in get file");
    const getParams = {
        Key: key,
        Bucket: bucketName
    }
    return s3.send(new GetObjectCommand(getParams))
}


export function deleteFile(key) {

    const deleteParams = {
        Key: key,
        Bucket: bucketName
    }
    return s3.send(new DeleteObjectCommand(deleteParams))
}
