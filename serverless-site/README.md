Serverless web app

To deploy your SPA as a serverless one use [Scotty](https://github.com/stojanovic/scottyjs)
Scotty is based on S3 and can serve your files

If you have Scotty setup, you can just use
`
scotty --spa
`

Note: bucket names are unique, so if you want to specify a unique bucket name
just add another parameter `-b <yourBucketName>`


