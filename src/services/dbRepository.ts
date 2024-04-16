import mongoose, { FilterQuery, MongooseQueryOptions } from "mongoose";

/**
 * Typings
 */
type IsDocExistsArgs<T> = {
  filter?: FilterQuery<T>;
  options?: Record<string, any> &
    Omit<MongooseQueryOptions, "lean" | "timestamps">;
};

export class DbRepository<T extends Record<string, any>> {
  constructor(private readonly model: mongoose.Model<T>) {}

  async isDocExits({ filter = {}, options = {} }: IsDocExistsArgs<T> = {}) {
    const count = await this.model.countDocuments(filter, options);
    return count ? true : false;
  }
}
