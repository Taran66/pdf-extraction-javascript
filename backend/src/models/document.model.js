import mongoose, {Schema} from 'mongoose'
import mongooseAggregatePaginate from 'mongoose-aggregate-paginate-v2'

const docSchema = new Scehma(
    {
        owner: [
            {
                type: Schema.Types.ObjectId,
                ref: "User"
            }
        ],
        fileURL: {
            type: String,
        },
        originalName: {
            type: String,
            required: true,
            trim: true
        },
        storedName: {
            type: String
        },
        size: {
            type: Number,
            required: true
        },
        fileType: {
            type: String,
            required: true
        }

    },{
        timestamps: true
    }
)

docSchema.plugin(mongooseAggregatePaginate)

export const Document = mongoose.model("Document", docSchema)

