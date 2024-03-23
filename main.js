function _screenshots() {
    $('.zoom-gallery').magnificPopup({
        delegate: 'a',
        type: 'image',
        closeOnContentClick: false,
        closeBtnInside: false,
        mainClass: 'mfp-with-zoom mfp-img-mobile',
        image: {
            verticalFit: true,
            titleSrc: function (item) {
                return item.el.attr('title') + ' &middot; <a class="image-source-link" href="' + item.el.attr('data-source') + '" target="_blank">image source</a>';
            }
        },
        gallery: {
            enabled: true
        },
        zoom: {
            enabled: true,
            duration: 300, // don't foget to change the duration also in CSS
            opener: function (element) {
                return element.find('img');
            }
        }
        
    });
}

function _hdSd(player, xx) {
    
    $("#qSelector").change(function () {
        var hd = $(this).is(":checked") ? 1 : 0;
        //alert("ok");
        $.ajax({
            type: "POST",
            async: true,
            cache: false,
            data: {do: "switch", id: $("#id").val(), hd: hd},
            url: "ajax.php",
            success: function (d) {
                //alert(d);
                if (d == "err")
                    alert("Error, please try again");
                else
                    
                    player.load({source: d});
                xx = true;
            }
        })
    })
}

function _fav() {
    $("#fav").click(function () {
        //alert("ok");
        $(this).attr("disable", true);
        $id = $(this).data("id");
        $dd = $(this).data("do");
        //alert($id);
        $.ajax({
            type: "POST",
            async: true,
            cache: false,
            data: {id: $id, d: $dd, do: "fav"},
            url: "ajax.php",
            dataType: "json",
            success: function (d) {
                if (d['err'] == "true")
                    alert("Please login first!");
                else if (d['err'] == "err") {
                    alert("You have already add this post to your list!");
                    
                } else {
                    $("#ffav").html(d['out']).ready(function () {
                        _fav();
                    });
                }
                $(this).attr("disable", false);
            }
        });
    });
}

function _imdb() {
    if ($("#fetchimdb").val() != "") {
        $.ajax({
            type: "POST",
            async: true,
            cache: false,
            data: {imdb: $("#fetchimdb").val(), do: "imdb"},
            url: "ajax.php",
            success: function (d) {
                //	alert(d);
                $("#imdbviewer").html(d);
            }
            
        });
    }
}

function _removeBadWords() {
    $("textarea").keyup(function () {
        $x = Array('زب', 'طيز', 'عير', 'كس', 'قحبة', 'كحبة', 'كواد', 'fuck', 'bitch', 'cock', 'pussy', 'pimp');
        for ($i = 0; $i <= $x.length - 1; $i++) {
            $(this).val($(this).val().replace(new RegExp($x[$i], "g"), ''));
        }
    });
}

function _likeDislike() {
    $("#like2").click(function (e) {
        $(this).attr("disable", true);
        $id = $("#id").val();
        $.ajax({
            type: "POST",
            async: true,
            cache: false,
            data: {id: $id, do: "like"},
            url: "ajax.php",
            success: function (d) {
                if (d == "false")
                    alert("Please login first!");
                else if (d == "err") {
                    alert("You have already liked this post!");
                    
                } else {
                    $("#like2-bs3").html(d);
                }
                $(this).attr("disable", false);
            }
        });
    });
    $("#dislike2").click(function (e) {
        $(this).attr("disable", true);
        $id = $("#id").val();
        $.ajax({
            type: "POST",
            async: true,
            cache: false,
            data: {id: $id, do: "dislike"},
            url: "ajax.php",
            success: function (d) {
                if (d == "false")
                    alert("Please login first!");
                else if (d == "err") {
                    alert("You have already liked this post!");
                    
                } else {
                    $("#dislike2-bs3").html(d);
                }
                $(this).attr("disable", false);
            }
        });
    });
}

function _sendComment() {
    $("#send").click(function () {
        $(this).attr("disable", true);
        $text = $("#comment").val();
        $id = $(this).data("id");
        if ($text) {
            $.ajax({
                type: "POST",
                async: true,
                cache: false,
                data: {pid: $id, text: $text, do: "comment"},
                url: "ajax.php",
                success: function (d) {
                    if (d == "false")
                        alert("Please put something in comment field");
                    else {
                        alert("Your comment send successfully, awaiting for supervisor approval");
                        $("#comment").val('');
                        
                    }
                    $(this).attr("disable", false);
                }
            });
        } else {
            alert("Please put something in comment field");
            $(this).attr("disable", false);
        }
        
    });
}

function _seriesSlider() {
    $('.homeseries').slick({
        dots: true,
        infinite: true,
        speed: 600,
        autoplay: true,
        autoplaySpeed: 5000,
        variableWidth: true,
        slidesToShow: 4,
        slidesToScroll: 4,
        responsive: [
            {
                breakpoint: 1024,
                settings: {
                    slidesToShow: 6,
                    slidesToScroll: 3,
                    infinite: true,
                    dots: true
                }
            },
            {
                breakpoint: 600,
                settings: {
                    slidesToShow: 4,
                    slidesToScroll: 2
                }
            },
            {
                breakpoint: 480,
                settings: {
                    slidesToShow: 2,
                    slidesToScroll: 1
                }
            }
            // You can unslick at a given breakpoint now by adding:
            // settings: "unslick"
            // instead of a settings object
        ]
    });
}

function _blocksSlider() {
    $('.homeblocks').slick({
        dots: true,
        infinite: true,
        speed: 600,
        autoplay: true,
        autoplaySpeed: 5000,
        variableWidth: true,
        slidesToShow: 4,
        slidesToScroll: 1,
        responsive: [
            {
                breakpoint: 1024,
                settings: {
                    slidesToShow: 4,
                    slidesToScroll: 1,
                    infinite: true,
                    dots: true
                }
            },
            {
                breakpoint: 600,
                settings: {
                    slidesToShow: 2,
                    slidesToScroll: 1
                }
            },
            {
                breakpoint: 480,
                settings: {
                    slidesToShow: 1,
                    slidesToScroll: 1
                }
            }
            // You can unslick at a given breakpoint now by adding:
            // settings: "unslick"
            // instead of a settings object
        ]
    });
    
    
}

