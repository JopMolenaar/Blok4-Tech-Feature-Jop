class People {

    name;
    lastName;
    pfPicture;
    link;
    constructor(name, lastName, pfPicture, link) {
      this.name = name;
      this.lastName = lastName;
      this.pfPicture = pfPicture;
      this.link = link;
    }

    getLowerCaseID(){
      return `${this.name.toLowerCase()}${this.lastName.toLowerCase()}`;
    }
  }
  
  