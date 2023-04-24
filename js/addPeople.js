class People {

    name;
    lastName;
    pfPicture;
    link;
    id;
    constructor(name, lastName, pfPicture, id) {
      this.name = name;
      this.lastName = lastName;
      this.pfPicture = pfPicture;
      this.id = id;
    }

    getLowerCaseID(){
      return `${this.name.toLowerCase()}${this.lastName.toLowerCase()}`;
    }
  }
  
  