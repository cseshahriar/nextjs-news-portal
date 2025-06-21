import React from 'react';
import PlainLayout from "@/components/master/PlainLayout";
import parse from "html-react-parser";

async function getData(){
    try {
        const res = await fetch(`${process.env.HOST}/api/policy?type=privacy`);
        const json = await res.json();
        return json?.data || [];
    } catch (error) {
        console.error("Fetch error:", error);
        return [];
    }
}

const Page = async () => {
    let data = await getData();

    const content = data?.length > 0 && data[0]?.long_des
        ? parse(data[0].long_des)
        : <p>No privacy policy found.</p>;

    return (
        <PlainLayout>
            <div className="container mt-3">
                <div className="row">
                    <div className="col-12">
                        <div className='card p-4'>
                            {content}
                        </div>
                    </div>
                </div>
            </div>
        </PlainLayout>
    );
};

export default Page;
