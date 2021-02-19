window.addEventListener("load", ()=>{
    let long;
    let lat;
    let temperatureDescription = document.querySelector(".temperature-description");
    let temperatureDegree = document.querySelector(".temperature-degree");
    let locationTimezone = document.querySelector(".location-timezone");
    //let stateTimezone = document.querySelector(".location-timezone");
    let temperatureSection = document.querySelector(".temperature");
    const temperatureSpan = document.querySelector(".temperature span");    
    if(navigator.geolocation){
        navigator.geolocation.getCurrentPosition
        (position =>{
            long = position.coords.longitude;
            lat = position.coords.latitude;

                 //let api_key= dca15249fb21ae94c59c400cc2f7eeac;
              // const proxy = "https://cors-anywhere.herokuapp.com/";
            // const api = `${proxy}https://api.darksky.net/forecast/e6e04dcca334bbb1f16e0d7a257d98bc/${lat},${long}`;
            const api = `https://api.openweathermap.org/data/2.5/onecall?lat=${lat}&lon=${long}&units=metric&appid=dca15249fb21ae94c59c400cc2f7eeac`
          
            fetch(api)
            .then(response =>{
                return response.json();
            })
            .then(data => {
                const{temp}= data.current;
                const{description} = data.current.weather[0];
                console.log(data)

           
                $.ajax({
                    url: "https://geoip-db.com/jsonp",
                    jsonpCallback: "callback",
                    dataType: "jsonp",
                    success: function(location) {
                      $('.location-timezone').html(location.country_name);
                      $('.state-zone').html(location.state);
                     
                      
                    }
                  });

                //set DOM elements from api
                temperatureDegree.textContent = Math.floor(temp);
                temperatureDescription.textContent = description;
               // locationTimezone.textContent = data.timezone;

                //formula
                //let convert = data.current.temp;
              //  let celcius = (temperatureDegree.value - 32) * (5/9);

                //set icon
               setIcons(icon, document.querySelector(".icon"));
               
    
            });

        });
      
    }
            function setIcons(icon, iconID){
                const skycons = new Skycons({color:"white"});
                const currentIcon = icon.replace(/-/g, "_").toUpperCase();
                skycons.play();
                return skycons.set(iconID, Skycons[currentIcon]);
            }


});