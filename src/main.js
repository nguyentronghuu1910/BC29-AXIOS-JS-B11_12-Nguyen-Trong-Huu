var service = new Services();

function getID(id) {
   return document.getElementById(id);
}

function getListOurTeams() {
   // lấy danh sách GV từ sever
   var promise = service.getListOurTeamApi()
   promise
      .then(function (result) {
         renderListOurTeams(result.data);
      })
      .catch(function (error) {
         console.log(error);
      })
}

getListOurTeams();

function renderListOurTeams(data) {
   var contentHTML = "";
   data.forEach(function (ourTeam) {
      contentHTML += `
      <div class="team__item">
          <div class="team__item-content">
            <div class="team__item-img">
              <img src="./assets/img/${ourTeam.hinhAnh}" />
          </div>
          <div class="team__item-info">
          <p class="team__item-country">${ourTeam.ngonNgu}</p>
          <p class="team__item-name">${ourTeam.hoTen}</p>
          <p class="team__item-description">
           ${ourTeam.moTa}
          </p>
        </div>
        </div>
      </div> 
      `;
   });

   getID("listOurTeams").innerHTML = contentHTML;
}