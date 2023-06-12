import mongoose, {Document, Schema} from "mongoose"

export interface TableDocument extends Document {
  name : string;
  columns: string[];
  rows: {
    [column: string]: string;
  }[];
}

const TableSchema = new Schema<TableDocument>({
  name: {
    type:String,
    required: true
  },
  columns: {
    type: [String],
    required: true,
  },
  rows: {
    type: [
      {
        type: Schema.Types.Mixed,
      }
    ],
    default: [],
  }
})

export default mongoose.model<TableDocument>('Table', TableSchema);
