//now call this code in frontend in useEffet

import dbConnect from '@/lib/dbConnect';
import User from '@/models/userModel';
import cron from 'node-cron';

export const deleteDeactivatedAccount = async() => {
    await dbConnect();

    const thirtyDaysAgo = new Date();
    thirtyDaysAgo.setDate(thirtyDaysAgo.getDate() - 30);

    try {
        const result = await User.deleteMany(
            {
                deleteAccountDate : { $lte : thirtyDaysAgo }
            }
        );
        console.log(`Deleted ${result.deletedCount} deactivated accounts successfully`);
    } catch (err) {
        console.error('Error Deleting deactivated account : ' , err);
        
    }
}

cron.schedule('0 0 * * *' , () => {
    console.log('Cronn jobs running');
    deleteDeactivatedAccount();
})
