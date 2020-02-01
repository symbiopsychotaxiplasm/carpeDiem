const mongoose  = require ('mongoose');
const geocoder  = require('../utils/geocoder');
const SiteSchema  = new mongoose.Schema(
    {
        siteId:
        {
            type: String,
            required: [true, 'Please add a site ID'],
            unique: true,
            trim: true,
            maxlength: [10, 'Site ID must be less than 10 characters'] 
        },
        address: {
            type: String,
            required: [true, 'Please add an address']
        },
        location: {
            type: {
              type: String, // Don't do `{ location: { type: String } }`
              enum: ['Point'] // 'location.type' must be 'Point'
              // required: true
            },
            coordinates: {
              type: [Number],
              index: '2dsphere'
              // required: true
            },
            formattedAddress: String
    },
    createdAt: {
        type: Date,
        default: Date.now
    }
    });

    //Geocode & create location

    SiteSchema.pre('save', async function(next){
        const loc = await geocoder.geocode(this.address);
        this.location = {
            type: 'Point',
            coordinates: [loc[0].longitude, loc[0].latitude],
            formattedAddress: loc[0].formattedAddress
        }

        // dont save address field
        this.address  = undefined;
        next();
        
    });

    
    module.exports  = mongoose.model('Site', SiteSchema);


