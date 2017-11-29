import { User } from "./user.model";
import { Link } from "./link.model";


export class Vote {

    constructor(
        public id?: String,
        public user?: User,
        public link?: Link
    ) {

    }
}