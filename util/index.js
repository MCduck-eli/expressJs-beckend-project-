import moment from "moment";

export default {
    formData(data) {
        return moment(data).format("DD MMM YYYY");
    },
    ifequal(a, b, option) {
        if (a == b) {
            return option.fn(this);
        }
        return option.inverse(this);
    },

    getNameCharacter(userName, lastName) {
        return userName.charAt(0) + "." + lastName.charAt(0);
    },
};
