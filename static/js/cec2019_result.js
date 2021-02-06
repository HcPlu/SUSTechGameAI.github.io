var total = ""
team = ["mballa", "Random", "Ben"]
points = [174, 158, 151]
winner = [10, 1, 14]
download = ["https://drive.google.com/open?id=1u8QvyXzESHIvZv5B68uhvvVWc1fxbobA", "", ""]
text = ["Download", "None", "None"]
for (var i = 0; i < 3; i++) {
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
team = ["mballa", "Random", "Ben"]
points = [[25, 18, 25, 15, 15, 15, 25, 18, 18],
          [18, 15, 15, 15, 15, 15, 15, 25, 25],
          [15, 25, 18, 15, 15, 15, 18, 15, 15]]
for (var i = 0; i < 3; i++) {
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
team = ["Random", "Ben", "mballa"]
points = [[18, 15, 15, 15, 15, 15, 15, 25, 25],
          [15, 25, 18, 15, 15, 15, 18, 15, 15],
          [25, 18, 25, 15, 15, 15, 25, 18, 18]]
winner = [[0, 0, 0, 0, 0, 0, 1, 0, 0], 
          [0, 9, 0, 0, 0, 0, 5, 0, 0], 
          [0, 0, 0, 0, 0, 0, 10, 0, 0]]
score = [[-0.8, -0.4, 0.3, 0, 0, 0, 2.8, 0.8, 2.7],
         [-0.8, 38.3, 3.1, 0, 0, 0, 0.9, 0, 0.7],
         [2.3, 0.4, 8.7, 0, 0, 0, 1.0, 0.3, 2.5]]

index = [[3, 2, 3, 1, 1, 1, 3, 1, 1],
         [1, 3, 2, 2, 2, 2, 2, 3, 3],
         [2, 1, 1, 3, 3, 3, 1, 2, 2]]


for (var i = 0; i < 9; i++) { 
  ss = " <table class=\"table text-center table-hover\"> \
            <thead> <tr> <th>Rank</th> <th>Teamname</th> <th>Points</th> \
             <th>#Winner</th> <th>Avr.Score</th> </tr> </thead>"

  ss += "<tbody>"

  for (var j=0; j<3; j++){
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

