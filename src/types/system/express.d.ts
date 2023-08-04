declare namespace Express {
  export interface Request {
    user?: import('../requestUser').RequestUser
  }
}

// import { RequestUser } from '../requestUser'
// declare namespace Express {
//     export interface Request {
//         user?: RequestUser
//     }
// }
