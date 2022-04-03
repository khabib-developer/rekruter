module.exports = class UserDto {
    name;
    phone;
    email;
    id;
    status;
    photo;
    resume;
    video;
    type;
    location;
    telegram_id;

    constructor(model) {
        this.name = model.dataValues.name
        this.phone = model.dataValues.phone
        this.email = model.dataValues.email
        this.id = model.dataValues.id
        this.status = model.dataValues.status
        this.photo = model.photo
        this.video = model.video
        this.telegram_id = model.telegram_id
        this.type = model.type
        this.resume = model.resume
        this.location = model.location
    }
}