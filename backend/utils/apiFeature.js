class ApiFeatures {
  constructor(query, queryStr) {
    this.query = query;
    this.queryStr = queryStr;
  }

  // Search function
  search() {
    const keyword = this.queryStr.keyword
      ? {
          name: {
            $regex: this.queryStr.keyword, // observing pattern and searching
            $options: "i", // make things case insensitive
          },
        }
      : {};

    this.query = this.query.find({ ...keyword });
    return this;
  }

  // Filter category
  filter() {
    const queryCopy = { ...this.queryStr };
    // queryStr is an obeject, and all objects are saved in JS by reference
    // we use spread Operator to make a duplicate copy

    // Removing some fields for category
    // console.log(queryCopy)
    const removeFields = ["keyword", "page", "limit"];
    removeFields.forEach((key) => delete queryCopy[key]);
    // console.log(queryCopy)

    // Filter for Price and rating
    // mongoDb excpet gt,gte,lt,lte as $gt,$gte,$lt,$lte

    let queryStr = JSON.stringify(queryCopy); //converitng to string
    queryStr = queryStr.replace(/\b(gt|gte|lt|lte)\b/g, (key) => `$${key}`);
    this.query = this.query.find(JSON.parse(queryStr)); //converting back to object

    // case sensitive

    return this;
  }

  // pagination
  pagination(resultPerPage) {
    const currentPage = Number(this.queryStr.page) || 1;
    const skipProducts = resultPerPage * (currentPage - 1);
    this.query = this.query.limit(resultPerPage).skip(skipProducts);
    return this;
  }
}

module.exports = ApiFeatures;
