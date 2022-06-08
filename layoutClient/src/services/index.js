function Services() {
   this.arr = [];

   this.getListOurTeamApi = function () {
      return axios({
         url: "https://628b99597886bbbb37bbca02.mockapi.io/api/ourTeach",
         method: "GET",
      });

   };
}