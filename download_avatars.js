var args = process.argv.slice(2);
var request = require('request');
var gitToken = require('./secrets.js')

console.log('Welcome to the GitHub Avatar Downloader!');


function getRepoContributors(repoOwner, repoName, cb) {
    var options = {
        url: "https://api.github.com/repos/" + repoOwner + "/" + repoName + "/contributors",
        headers: {
          'User-Agent': 'request',
          'Authorization':gitToken.GITHUB_TOKEN
        }
      };
    if (!repoOwner || !repoName) {
      console.log('Please ensure all information is provided');
    } else {
      request(options, function(err, res, body) {
        var parsedBody = JSON.parse(body);
        cb(err, parsedBody);
    });
    }
}



  getRepoContributors(args[0], args[1], function(err, result) {

    result.forEach(function(contributor){
        var fs = require('fs');
       downloadImageByURL(contributor.avatar_url, `avatars/${contributor.login}.jpg`);

    })
  });

  function downloadImageByURL( url, filePath) {
    var fs = require('fs');
    request.get(url).pipe(fs.createWriteStream(filePath));
  }


