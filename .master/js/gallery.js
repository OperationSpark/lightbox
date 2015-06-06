$(document).ready(function() {
    // IMPORT LIBRARIES //
    var 
        _ = window._,
        random = window.opspark.random,
        lightbox = window.opspark.lightbox;
        
    var regExFileExt = /[^\\/]+$/;
    
    // TODO 4 : Declare module-level variables //
    var
        name,
        $galleryNavList,
        $galleryName,
        $gallery,
        $lightbox;
    
    // TODO 5 : Initialize module-level variables //
    name = $.url(window.location).param('gallery');
    $galleryNavList = $('#gallery-nav-list');
    $galleryName = $('#gallery-name');
    $gallery = $('#gallery');
    $lightbox = $('#lightbox', $gallery);
    
    $.getJSON('galleries.json').then(function(galleries) {
        var gallery, thumbs, images;
        
        // TODO 6 : Create the gallery menu //
        galleries.forEach(function (gallery) {
            var href = 'gallery.html?gallery=' + gallery.name;
            $galleryNavList.append(createNavItem(href, gallery.name));
        });
        
        // TODO 7 : Prepare our data // 
        gallery = _.find(galleries, {'name': name}) || random.element(galleries);
        thumbs = gallery.thumbs;
        images = gallery.images;
        
        // TODO 8 : Update the gallery-name HTML tag //
        $galleryName[0].innerHTML = gallery.name;
        
        // TOOD 9 : Process the list of thumbs / images //
        thumbs.forEach(function (thumb, index) {
            var image = images[index];
            if (fileNamesMatch(thumb, image))
                addThumbnail(thumb, image);
        });
    });
    
    // TODO 10 : Add an on-click handler to close the lightbox //
    $lightbox.on('click', function () {
        $lightbox.fadeOut(400, function () {
            $('.gallery-detail', $lightbox).remove();
        });
    });
    
    function showLightbox(e) {
        e.preventDefault();
        
        var pacifier, imagePath, $imageTag;
        
        pacifier = lightbox.makePacifier($lightbox[0]);
        imagePath = $(e.currentTarget).attr('href');
        $imageTag = $(document.createElement('img'))
            .hide()
            .attr('src', imagePath)
            .addClass('gallery-detail')
            .on('load', function(e) {
                pacifier.stop();
                $imageTag.fadeIn(200);
            });
        $lightbox.append($imageTag);
        $lightbox.fadeIn(400);
    }
    
    function createNavItem(href, label) {
        return '<li><a href="' + href + '">' + label + '</a></li>';
    }
    
    function addThumbnail(thumbUrl, imageUrl) {
        var $linkTag, $imageTag;
            
            $linkTag = $(document.createElement('a'))
                .attr('href', imageUrl)
                .on('click', showLightbox);
            
            $imageTag = $(document.createElement('img'))
                .addClass('gallery-item')
                .attr('src', thumbUrl);
                
            $linkTag.append($imageTag).appendTo($gallery);
    }
    
    function fileNamesMatch(fileOne, fileTwo) {
        return regExFileExt.exec(fileOne)[0] === regExFileExt.exec(fileTwo)[0];
    }
});