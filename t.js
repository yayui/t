function f() {
  var image = document.getElementById("demo");
  var img_array = ["http://www.comicworld.com.tw/ULImages/ADPics/54.jpg",
	      "http://www.comicworld.com.tw/ULImages/ADPics/55.jpg",
	      "http://www.comicworld.com.tw/ULImages/ADPics/56.jpg",
	      "http://www.comicworld.com.tw/ULImages/ADPics/57.jpg",
          "http://www.comicworld.com.tw/ULImages/ADPics/58.jpg",
	      "http://www.comicworld.com.tw/ULImages/ADPics/59.jpg",
	      "http://www.comicworld.com.tw/ULImages/ADPics/60.jpg"];
  var index = 0;

  function slide() {
    image.src = img_array[index++ % img_array.length];
  }
  setInterval(slide, 3000);
}

function initGooogleMap(target) {
  document.getElementById('google-map-iframe').contentDocument.location.reload(true);
  var map_iframe = document.getElementById('google-map-iframe');
  var q_array = ["國立台灣大學體育館", "高雄市社教館綜合體育館", "台中逢甲大學體育館"];
  $(target).click(function () {
    map_iframe.src = 'https://www.google.com/maps/embed/v1/place?key=AIzaSyDiFLrCeYtvuuuY1B587MTHSNgj1QzoZPs&q=' + q_array[target.split('-').pop()];
  });
}

function initList() {
  var list = [
    {
      "ig": "http://www.comicworld.com.tw/ULimages/ActPics/66/ActLink.gif",
      "tl": "【CWT-45】(台大場)",
      "ct": "活動日期 2017年2月4 / 5日",
      "lk": "http://www.comicworld.com.tw/Act1/66",
      "ad": "台大巨蛋體育館B1&1F&3F",
      "mj": "25.016959",
      "mw": "121.533851"
        },
    {
      "ig": "http://www.comicworld.com.tw/ULimages/ActPics/67/ActLink.gif",
      "tl": "【CWT-K23】(高雄場)",
      "ct": "活動日期 2017年2月11 / 12日",
      "lk": "http://www.comicworld.com.tw/Act1/67",
      "ad": "高雄市社教館綜合體育館",
      "mj": "22.565322",
      "mw": "120.359476"
        },
    {
      "ig": "http://www.comicworld.com.tw/ULimages/ActPics/68/ActLink.gif",
      "tl": "【CWT-T17】(台中場)",
      "ct": "活動日期 2017年2月25 / 26日",
      "lk": "http://www.comicworld.com.tw/Act1/68",
      "ad": "台中逢甲大學體育館3F",
      "mj": "24.178693",
      "mw": "120.646740"
        }
	             ];
  var str = '';
  for (var i in list) {
    str += '<li class="collection-item avatar">';
    str += '<img src="' + list[i].ig + '" class="circle">';
    str += '<span class="title">' + list[i].tl + '</span>';
    str += '<p>' + list[i].ct + '</p>';
    str += '<p>' + list[i].ad + '</p>';
    str += '<a href="' + list[i].lk + '" class="secondary-content"><i class="material-icons">grade</i></a>';
    str += '</li>';
  }
  document.getElementById("event-list").innerHTML = str;
}

function initPixnetData() {
  var xmlhttp = new XMLHttpRequest();
  var url = "https://emma.pixnet.cc/mainpage/blog/categories/hot/21?page=1&per_page=3&api_version=2&format=json";
  xmlhttp.onreadystatechange = function () {
    if (xmlhttp.readyState == 4 && xmlhttp.status == 200) {
      var myArr = JSON.parse(xmlhttp.responseText);
      var data = myArr.articles;
      var out = '';
      for (var i in data) {
        out += '<li class="collection-item avatar">';
        out += (data[i].thumb) ? '<img src="' + data[i].thumb + '" class="circle">' : '';
        out += (data[i].title) ? '<p><a href="' + data[i].link + '" target="_blank">' + data[i].title + '</a></p>' : '';
        out += '<p> </p>';
        if (data[i].tags.length) {
          out += '<p>Tags: ';
          for (var j in data[i].tags) {
            out += data[i].tags[j].tag + ', ';
          }
          out += '</p>';
        }
        out += '<br /><br /><br />';
      }
      document.getElementById("pixnet-stuff").innerHTML = out;
    }
  }
  xmlhttp.open("GET", url, true);
  xmlhttp.send();
}

function initPlayer() {
  var apiKey = "AIzaSyCIlwa-7d7qpKS0Nj5vhI7tb-0minC-qZ8";

  function getVideos(pid, apiKey) {
    $.get("https://www.googleapis.com/youtube/v3/playlistItems", {
        part: "snippet,contentDetails",
        maxResults: 50,
        playlistId: pid,
        key: apiKey
      },
      function (data) {
        $.each(data.items, function (i, item) {
          var str = '<div style="float:left;font-size:small;margin:5px;">';
          str += '<a href="https://youtu.be/' + item.snippet.resourceId.videoId + '" target="_blank"><img src="' + item.snippet.thumbnails.medium.url + '" /><br />' + item.snippet.title + '</a><br />';
          if (item.contentDetails.note !== undefined) str += '<a href="' + item.contentDetails.note + '" target="_blank">延伸閱讀</a><br />';
          str += '</div>';
          document.getElementById("VideoThumbs").innerHTML += str;
        })
      }
    );
  }
  getVideos("PL3DdAEaOBSIBZDWqIQLG0BT6UPeTDZXuf", apiKey)
}

function initTab() {
  var b_array = ['#tab-trigger-1', '#tab-trigger-2', '#tab-trigger-3'];
  var t_array = ["#tab-target-1", "#tab-target-2", "#tab-target-3"];
  $(t_array[0]).show();
  $(t_array[1]).hide();
  $(t_array[2]).hide();
  $(b_array[0]).click(function () {
    $(t_array[0]).show();
    $(t_array[1]).hide();
    $(t_array[2]).hide();
  });
  $(b_array[1]).click(function () {
    $(t_array[0]).hide();
    $(t_array[1]).show();
    $(t_array[2]).hide();
  });
  $(b_array[2]).click(function () {
    $(t_array[0]).hide();
    $(t_array[1]).hide();
    $(t_array[2]).show();
  });
}

function getPageData() {
  f();
  initList();
  initTab();
  initGooogleMap('#btn-0');
  initGooogleMap('#btn-1');
  initGooogleMap('#btn-2');
  initPixnetData();
  initPlayer();
}

window.onload = getPageData();