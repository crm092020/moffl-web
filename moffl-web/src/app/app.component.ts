import { Component, OnInit } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { MofflRepository } from './mofflRepository';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.less']
})
export class AppComponent implements OnInit {
  title = 'moffl-web';
  standings: any[];
  teams: any[] = [];
  league: any[];
  constructor(private mofflRepository: MofflRepository) { }


  ngOnInit() {
    this.showStandings();
}

  

  showStandings(){
    
    this.league = this.mofflRepository.getLeague().league.franchises.franchise;
    this.standings = this.mofflRepository.getStandings().leagueStandings.franchise;
    this.league.forEach(teamWithName => {
      var team = {
        Name: '',
        Wins: 0,
        Losses: 0,
        AllPlayWins: 0,
        TotalPoints: 0,
      };
      var stats = this.standings.find(x => x.id == teamWithName.id);
      
      team.Name = teamWithName.name;
      team.Wins = +stats.h2hw;
      team.Losses = +stats.h2hl;
      team.AllPlayWins = +stats.all_play_w;
      team.TotalPoints = (team.Wins * 6) + team.AllPlayWins;
      this.teams.push(team);

    });

    this.teams.sort((a, b) => {
      if (a.TotalPoints > b.TotalPoints) {
        return -1;
      }
      if (a.TotalPoints < b.TotalPoints) {
        return 1;
      }
      // a must be equal to b
      return 0;
    })

  }
}
