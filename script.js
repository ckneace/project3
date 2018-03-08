var app = new Vue({
          el: '#app',
          data: {
          name: '',
          number: '',
          current: '',
          jerseyNumber: '',
          nationality: '',
          // max: '',
          // current: {},
          // loading: true,
          // addedComment: '',
          // addedTime:'',
          // comments: {},

          },
          created: function() {
          this.xkcd();
          },
          methods: {
          xkcd: function() {
            console.log("hello");
          // this.loading = true;
          fetch('http://api.football-data.org/v1/teams/66/players', {
            headers: {'X-Auth-Token': 'f2e3e4a8a7544e8fa5316b88a0c47f80'}}).then(response => {
          return response.json();
        }).then(json => {  console.log("hello2");
          this.current = json;
          // this.name = json.players[0].name;
           // var regex = /.*?(\d+)$/; // the ? makes the first part non-greedy
           // var res = regex.exec(json.fixtures[0]._links.awayTeam.href);
           // var teamId = res[1];
           console.log(json);

         return true;
        }).catch(err => {

        });
          },

          getRandom: function(min, max) {
                  min = Math.ceil(min);
                  max = Math.floor(max);
                  return Math.floor((Math.random() * max) + 1);//The maximum and minimum are inclusive
                  },
          randomPage: function() {
            console.log("here");
            console.log(this.current.players);
            this.number = this.getRandom(1, this.current.players.length);
            this.name = "Name: " + this.current.players[this.number].name;
            this.jerseyNumber = "Jersey Number: " + this.current.players[this.number].jerseyNumber;
            this.nationality = "Nationality: " + this.current.players[this.number].nationality;
                  },



            },
                  computed: {


                  },
                  watch: {
                  number: function(value,oldvalue) {
                  if (oldvalue === '') {
                  this.max = value;
                  } else {
                  this.xkcd();
                  }
                  },
                  },

              });
