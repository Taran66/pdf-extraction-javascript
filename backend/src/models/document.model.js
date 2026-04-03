import mongoose, {Schema} from 'mongoose'

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

userSchema.pre("save", asy)