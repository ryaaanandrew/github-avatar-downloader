var request = require('request');
var gitToken = require('./secrets.js');

console.log('Welcome to the Github Avatar Downloader!');

function getRepoContributors(repoOwner, repoName, callback) {
  var option = {
    url: "https://api.github.com/repos/" + repoOwner + "/" + repoName + "/contributors",
    headers: {
      'User-Agent': 'request',
      'Authorization': gitToken.GITHUB_TOKEN
    }
  }

  request(option, function(err, res, body) {
    var parsedBody = JSON.parse(body);
    callback(err, parsedBody);
  });
};


getRepoContributors('jquery', 'jquery', function(err, result){
  console.log('Errors: ', err);
  result.forEach(function(contributor){
    console.log('avatar url: ', contributor.avatar_url);
  });

});