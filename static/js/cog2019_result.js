var total = ""
team = [ "Random", "mballa", "TNTBot", "UjiAgent"]
points = [158, 153, 124, 120]
winner = [9, 20, 1, 0]
download = ["", "", "", "https://drive.google.com/open?id=1Sy6YH8eGghSE4HRswlFiskgcQJoATOu1"]
text = ["None", "None", "None", "Download"]
for (var i = 0; i < 4; i++) {
  total += "<tr>"
  total += "<td>" + String(i+1) +"</td>"

  total += "<td>" + team[i] + "</td>"
  total += "<td>" + points[i] + "</td>"
  total += "<td>" + winner[i] + "/180</td>"
  total += "<td> <a href=\" " + download[i] + "\" target=\"_blank\" class=\"btn btn-success\"> " + text[i] + "</a> </td>"
  total += "</tr>"
}

document.getElementById("final-rank-table").innerHTML = total

var total = ""
team = ["Random", "mballa", "TNTBot", "UjiAgent"]
points = [ [18, 18, 18, 12, 12, 12, 18, 25, 25],
           [25, 12, 25, 12, 12, 12, 25, 15, 15],
           [12, 25, 15, 12, 12, 12, 12, 12, 12],
           [12, 12, 12, 12, 12, 12, 12, 18, 18]]
for (var i = 0; i < 4; i++) {
  total += "<tr>"
  total += "<td>" + String(i+1) +"</td>"

  total += "<td>" + team[i] + "</td>"
  var x = 0
  for (var j = 0; j<9; j ++) {
    x += points[i][j]
    total += "<td>" + points[i][j] + "</td>"
  }
  total += "<th>" + x + "</th>"
  total += "</tr>"
}

document.getElementById("total").innerHTML = total


games = ["g1-l2","g1-l3","g1-l4",
         "g2-l2","g2-l3","g2-l4",
         "g3-l2","g3-l3","g3-l4"]
team = ["Random", "TNTBot", 'UjiAgent', "mballa"]

points = [[18, 18, 18, 12, 12, 12, 18, 25, 25],
           [12, 25, 15, 12, 12, 12, 12, 12, 12],
           [12, 12, 12, 12, 12, 12, 12, 18, 18],
           [25, 12, 25, 12, 12, 12, 25, 15, 15]]

winner = [[0, 0, 0, 0, 0, 0, 3, 0, 6],
          [0, 1, 0, 0, 0, 0, 0, 0, 0],
          [0, 0, 0, 0, 0, 0, 0, 0, 0],
          [0, 0, 0, 0, 0, 0, 20, 0, 0]]

score = [[0.65,0,0.25,0,0,0,2.45,1.3,2.4],
         [-1,14.45,0,0,0,0,0,0,0],
         [-1,-1,-1,0,0,0,0,1,3],
         [4.83,-1,4.45,0,0,0,1,0.6,2]]

index = [[4, 2, 4, 1, 1, 1, 4, 1, 1],
         [1, 1, 1, 2, 2, 2, 1, 3, 3],
         [2, 3, 2, 3, 3, 3, 2, 4, 4],
         [3, 4, 3, 4, 4, 4, 3, 2, 2]]



for (var i = 0; i < 9; i++) { 
  ss = " <table class=\"table text-center table-hover\"> \
            <thead> <tr> <th>Rank</th> <th>Teamname</th> <th>Points</th> \
             <th>#Winner</th> <th>Avr.Score</th> </tr> </thead>"

  ss += "<tbody>"

  for (var j=0; j<4; j++){
    ss += "<tr>"
    ss += "<td>" + String(j+1) +"</td>"

    var k = index[j][i] - 1

    ss += "<td>" + team[k] + "</td>"
    ss += "<td>" + points[k][i] + "</td>"
    ss += "<td>" + winner[k][i] + "</td>"
    ss += "<td>" + score[k][i] + "</td>"
  }

  ss += "</tbody> </table>"

  document.getElementById(games[i]).innerHTML = ss
}

