import pickle, os, json


def show_game_detail(board):   
    game_info = {}
    team_points = {}
    team_winner = {}
    g_list = [0, 1, 2, 3, 4, 5, 6, 7, 8]
    for i in g_list:
        tmp = board[i]
        team_num = len(tmp["team"])   
        each_game, detail = {}, {}
        for j in range(team_num):
            rank_dict = {}         
            rank_dict["teamname"] = tmp["team"][j]
            rank_dict["points"] = tmp["points"][j]
            rank_dict["winner"] = tmp["winner"][j]
            rank_dict["avr_score"] = tmp["avr_score"][j]
            rank_index = "rank" + str(j+1)
            detail[rank_index] = rank_dict

            if tmp["team"][j] in team_points:
                team_points[tmp["team"][j]].append(tmp["points"][j])
                team_winner[tmp["team"][j]] += tmp["winner"][j]
            else:
                team_points[tmp["team"][j]] = [tmp["points"][j]]
                team_winner[tmp["team"][j]] = tmp["winner"][j]

        
        each_game["game_name"] = tmp["name"]
        each_game["detail"] = detail

        game_info[tmp["name"]] = each_game
    return game_info, team_points, team_winner

def show_game_rank(team_points, team_winner):
    team_num = len(team_points)
    points_total = {}
    for team in team_points:
        tmp = sum(team_points[team])
        points_total[team] = tmp
    
    points_total = sorted(points_total.items(), key=lambda x:x[1], reverse=True)
    i = 0
    final_points_winner = {}
    points_detail = {}
    for team in points_total:
        i += 1
        rank_index = "rank" + str(i)
        tmp = {}
        tmp["teamname"] = team[0]
        tmp["total"] = team[1]
        tmp["winner"] = team_winner[team[0]]
        final_points_winner[rank_index] = tmp
        tmp["points_list"] = team_points[team[0]]
        points_detail[rank_index] = tmp       
    
    return points_detail, final_points_winner


path = "data/board_ppsn_cog2020.pkl"
with open(path, "rb") as f:
    board = pickle.load(f)

print(board[1]["team"])
game_detail, team_points, team_winner = show_game_detail(board)
points_detail, final_points_winner = show_game_rank(team_points, team_winner)
team_num = len(final_points_winner)
json_dict = {"game_detail":game_detail, 
            "points_detail": points_detail, 
            "final_points_winner": final_points_winner,
            "team_num": team_num}


b = json.dumps(json_dict)
f2 = open('ranking.json', 'w')
f2.write(b)
f2.close()