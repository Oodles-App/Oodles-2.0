import {PrismaClient} from '@prisma/client'
import Image from 'next/image';
import Link from 'next/link';
const prisma = new PrismaClient();
import { useState } from 'react';
import { useRouter } from 'next/router';

export const getServerSideProps = async({params}) => {
    const organization = await prisma.user.findUnique({
        where: {
            id: parseInt(params.id)
        }
    })
    console.log(organization)
    return {
        props: {
           organizationInfo: JSON.parse(JSON.stringify(organization))
        },
    }

}

const Organization = ({organizationInfo}) => {
    const [organization, setOrganizations] = useState(organizationInfo)
    const router = useRouter();

    return (
        <div>
            <div>
                <Image src="/organization.png" alt="Food Banner" width="50%" height="50%" style={{justifyItems:'center'}}/>
                <h1>{organization.businessName}</h1>
                <p>{organization.address}</p>
                <p>{organization.contactNum}</p>
                <div>
                    <p>Bio:</p>
                </div>
            </div>
            <button type="button" style={{border:"1px solid black"}} onClick={() => {router.push("/browse")}}>Back</button>

        </div>
        
    )
}

export default Organization;
