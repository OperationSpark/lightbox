#!/usr/bin/env node

'use strict';

var 
    argv = require('minimist')(process.argv.slice(2)),
    _ = require('lodash'),
    fsJson = require('fs-json')(),
    glob = require("glob");

function globby() {
    glob("**/*.+(png|jpg)", {cwd: process.cwd() + '/' + argv._[0]}, function (er, files) {
        var galleries = [];
        
        _.uniq(files.map(function (file) {
            // get all the unique gallery directories //
            return /^([A-Za-z]+[A-Za-z0-9-_]+)(\/)/.exec(file)[1];
        }))
        .forEach(function (gallery) {
            var name, thumbs, images;
            
            name = gallery,
            thumbs = [], 
            images = [];
            
            var galleryFiles = files.filter(function (file) {
                return new RegExp(gallery + '/', 'i').exec(file);
            });
            
            // pull out the files by gallery //
            galleryFiles.forEach(function (file) {
                file = 'img/gallery/' + file;
                
                // if the string contains 'thumb', assume it's a thumbnail //
                if (/\/thumb/.test(file)) thumbs.push(file);
                else images.push(file);
            });
            
            galleries.push({
                name: name,
                images: images,
                thumbs: thumbs
            });
        });
        fsJson.saveSync(process.cwd()  + '/galleries.json', galleries);
        console.log(galleries);
        console.log('Curation complete! Enjoy the galleries!');
    });
}
globby();

////////////////////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////////////

var 
    walk = require('walk'),
    walker;
    
function curate(dir, map) {
    walker = walk.walk(dir);
    
    var galleries = {};
    
    walker.on('directory', function (root, stats, next) {
        var name = stats.name;
        var parent = _.where(galleries, {'path': root})[0] || galleries;
        parent[name] = {
            path: root + '/' + name,
            files: [] 
        };
        next();
    });

    walker.on("file", function (root, stats, next) {
        var parent = deepfind(galleries, {'path': root});
        if (parent) { parent.files.push(root + '/' + stats.name); }
    next();
});
 
  walker.on("errors", function (root, nodeStatsArray, next) {
    next();
  });
 
  walker.on("end", function () {
    console.log("all done");
    console.log(galleries);
  });
}
//curate(process.cwd() + '/img/gallery', {});

function deepfind(items, attrs) {
  function match(value) {
    for (var key in attrs) {
      if(!_.isUndefined(value)) {
        if (attrs[key] !== value[key]) {
          return false;
        }
      }
    }
    return true;
  }
  function traverse(value) {
    var result;
    _.forEach(value, function (val) {
      if (match(val)) {
        result = val;
        return false;
      }
      if (_.isObject(val) || _.isArray(val)) {
        result = traverse(val);
      }
      if (result) {
        return false;
      }
    });
    return result;
  }
  return traverse(items);
}