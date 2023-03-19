import { generateV4ReadSignedUrl } from "../utils/gcloud-storage";
import { PaginationParam } from "./pagination-params.dto";
import { IPhotos, Photos } from "./photos.model";
import { IUser, User } from "./user.model";
import bcrypt from "bcrypt";
import { LoginDTO } from "../auth/login.dto";

function queryDataFromPagination({
  rowsPerPage = "10",
  page = "1",
}: PaginationParam) {
  const limit = parseInt(rowsPerPage);
  const skip = (parseInt(page) - 1) * limit;
  return { skip, limit };
}

const comparePassword = (user: IUser, password: string) =>
  user.password &&  bcrypt.compare(password, user.password);

export const verifyCredential = async function ({ email, password }: LoginDTO) {
  try {
    const user = await User.findOne({ email }).select('+password').exec();
    if (user && (await comparePassword(user, password))) {
      return user;
    }
    return { error: "Data Not Found", status: 404 };
  } catch (err) {
    return { error: err, status: 500 };
  }
};

export const verifyUser = async function (email: string) {
    try {
      const user = await User.findOne({ email }).exec();
      if (user) {
        return user;
      }
      return { error: "Data Not Found", status: 404 };
    } catch (err) {
      return { error: err, status: 500 };
    }
  };

export const getAllUsers = async function (params: PaginationParam) {
  try {
    const { skip, limit } = queryDataFromPagination(params);
    const [result]: { data: IUser[]; totalCount: Number }[] =
      await User.aggregate([
        {
          $facet: {
            data: [
              { $match: {} },
              { $sort: { id: 1 } },
              { $unset: ["password"]},
              { $skip: skip },
              { $limit: limit },
            ],
            totalCount: [{ $count: "count" }],
          },
        },
      ]);
    if (result?.data?.length) {
      return result;
    }
    return { error: "Data Not Found", status: 404 };
  } catch (err) {
    return { error: err, status: 500 };
  }
};

export const getAllPhotos = async function (params: PaginationParam) {
  try {
    const { skip, limit } = queryDataFromPagination(params);
    const [result]: { data: IPhotos[]; totalCount: Number }[] =
      await Photos.aggregate([
        {
          $facet: {
            data: [
              { $match: {} },
              { $sort: { id: 1 } },
              { $skip: skip },
              { $limit: limit },
            ],
            totalCount: [{ $count: "count" }],
          },
        },
      ]);

    if (result?.data?.length) {
      const { data, totalCount } = result;
      const photos: IPhotos[] = [];
      for (let photo of data) {
        photos.push({
          ...photo,
          path: await generateV4ReadSignedUrl(photo.path),
        });
      }
      return { data: photos, totalCount };
    }
    return { error: "Data Not Found", status: 404 };
  } catch (err) {
    return { error: err, status: 500 };
  }
};
