import {PrismaClient} from '@prisma/client'
import Image from 'next/image';
import Link from 'next/link';
const prisma = new PrismaClient();
import { useState } from 'react';
import { useRouter } from 'next/router';
import dynamic from "next/dynamic";

const LiveChat = dynamic(() => import("../../../components/liveChat/LiveChat"), {
  ssr: false,
});

export const getServerSideProps = async({params}) => {
    const organization = await prisma.user.findUnique({
        where: {
            id: parseInt(params.id)
        }
    })
    const tags = await prisma.tag.findMany({
        include: {
            users: true
        }
    })
    return {
        props: {
           organizationInfo: JSON.parse(JSON.stringify(organization)),
           tags: JSON.parse(JSON.stringify(tags)).filter((tag) => tag.users.some((user) => user.id === +params.id))
        },
    }

}

const Organization = ({organizationInfo, tags}) => {
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
                {tags.map((tag) => <p key={tag.id}>{tag.label}</p>)}
            </div>
            <button type="button" style={{border:"1px solid black"}} onClick={() => {router.push("/browse")}}>Back</button>
            <LiveChat />
        </div>
        
    )
}

export default Organization;
