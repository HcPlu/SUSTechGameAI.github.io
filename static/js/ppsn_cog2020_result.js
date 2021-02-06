function load_confirm(e){
  name = e.getAttribute("agent-name")
  if (confirm("Download " + name + ".log?")){
    path = '/gvgai/ppsn_cog2020/ranking/' + name
    window.open(path)
    console.log("Download ..."+name)
  } else {
    console.log("Cancel ...")
  }
  
}

$( document ).ready(function() {
  $("#simu_btn").click( function (){
    $.get('simu')
  });

  $.getJSON('rank_board', function(data){
    console.log(data)
    var team_num = data.team_num

    // part 1
    base = ""
    for (var i=0; i<team_num; i++){
      base = base + "<tr id=final_rank" + (i+1) + "> </tr>"
    }
    document.getElementById("final_rank").innerHTML = base
    var final_rank_board = data.final_points_winner
    
    for (var key in final_rank_board){
      var content = ""
      var team_in_final = final_rank_board[key]
      content = content + "<th>" + key.slice(4) + "</th>"
      content = content + "<th>" + team_in_final.teamname + "</th>"
      content = content + "<th>" + team_in_final.total + "</th>"
      content = content + "<th>" + team_in_final.winner + "</th>"
      content = content + "<th> <button agent-name = \"" + team_in_final.teamname + " \" class=\"btn btn-success btn-sm\" onclick=\"load_confirm(this)\">Download</button></th>" 
      document.getElementById("final_"+key).innerHTML = content
    }
    

    // part 2
    base = ""
    for (var i=0; i<team_num; i++){
      base = base + "<tr id=points_rank" + (i+1) + "> </tr>"
    }
    document.getElementById("points_list").innerHTML = base

    var points_detail_board = data.points_detail
    for (var key in final_rank_board){
      var content = ""
      var team_in_points = points_detail_board[key]
      content = content + "<th>" + key.slice(4) + "</th>"
      content = content + "<th>" + team_in_points.teamname + "</th>"
      for (var j=0; j < 9; j++){
        content = content + "<th>" + team_in_points.points_list[j] + "</th>"
      }
      content = content + "<th>" + team_in_points.total + "</th>"
      document.getElementById("points_"+key).innerHTML = content
    }
    
    
    // part 3   
    var game_list = ["g1-l2","g1-l3", "g1-l4",
                     "g2-l2","g2-l3", "g2-l4",
                     "g3-l2","g3-l3", "g3-l4"]
    for (var i=0; i<game_list.length; i++){
      base = "<br> \
      <table class=\"table table-hover table-bordered text-center\"> \
          <thead class=\"tablerow subtable header\"> \
              <tr> \
                <th>Rank</th> \
                <th>Teamname</th> \
                <th> Points </th> \
                <th> #Winner </th> \
                <th> Avr.Score </th> \
              </tr> \
          </thead> \
          <tbody class= \"tablerow\"> "
      for (var j=0; j<team_num; j++){
        base = base + "<tr id=game" + (i+1) + "_rank" + (j+1) + "> </tr>"
      }
      base = base +  "</tbody> </table>"
      document.getElementById(game_list[i]).innerHTML = base
      var game_detail_board = data.game_detail[game_list[i]]["detail"]

      for (var key in game_detail_board){
        var content = ""
        var team_in_game = game_detail_board[key]
        content = content + "<th>" + key.slice(4) + "</th>"
        content = content + "<th>" + team_in_game.teamname + "</th>"
        content = content + "<th>" + team_in_game.points + "</th>"
        content = content + "<th>" + team_in_game.winner + "</th>"
        content = content + "<th>" + team_in_game.avr_score + "</th>"
        document.getElementById("game"+(i+1)+"_" + key).innerHTML = content
      }
    }
  })

  

});