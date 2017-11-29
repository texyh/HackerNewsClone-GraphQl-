import { User } from "./user.model";
import { Vote } from "./vote.model";


export class Link {

    constructor(
        public id?: string,
        public description?: string,
        public url?: string,
        public createdAt?: Date,
        public postedBy?: User,
        public votes?: Vote[]
    ) {
    }

}
