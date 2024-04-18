'use client'
import { UserButton } from '@clerk/nextjs'
import Image from 'next/image'
import Link from 'next/link'
import React, { useEffect, useState } from 'react'
import {Search} from "lucide-react"
import axios from "axios"
import { useRouter } from 'next/navigation'
import { Story } from '@prisma/client'
import { getStoryById } from '@/actions/getStories'
import Select from "react-select"
import { ethers } from 'ethers';


type Props = {
    storyId: string
    CurrentUserId: string
    CurrentUserFirstName: string | null
    CurrentUserLastName: string | null
}

const NavbarStory = ({ storyId, CurrentUserFirstName, CurrentUserLastName, CurrentUserId }: Props) => {
    const router = useRouter()
    const [showPopup, setShowPopup] = useState<boolean>(false)
    const erc20ABI = [ { "inputs": [ { "internalType": "address", "name": "spender", "type": "address" }, { "internalType": "uint256", "name": "value", "type": "uint256" } ], "name": "approve", "outputs": [ { "internalType": "bool", "name": "", "type": "bool" } ], "stateMutability": "nonpayable", "type": "function" }, { "inputs": [ { "internalType": "uint256", "name": "value", "type": "uint256" } ], "name": "burn", "outputs": [], "stateMutability": "nonpayable", "type": "function" }, { "inputs": [ { "internalType": "address", "name": "account", "type": "address" }, { "internalType": "uint256", "name": "value", "type": "uint256" } ], "name": "burnFrom", "outputs": [], "stateMutability": "nonpayable", "type": "function" }, { "inputs": [ { "internalType": "address", "name": "initialOwner", "type": "address" }, { "internalType": "uint256", "name": "_totalSupply", "type": "uint256" }, { "internalType": "address", "name": "_initialTokenOwner", "type": "address" } ], "stateMutability": "nonpayable", "type": "constructor" }, { "inputs": [], "name": "CheckpointUnorderedInsertion", "type": "error" }, { "inputs": [ { "internalType": "address", "name": "delegatee", "type": "address" } ], "name": "delegate", "outputs": [], "stateMutability": "nonpayable", "type": "function" }, { "inputs": [ { "internalType": "address", "name": "delegatee", "type": "address" }, { "internalType": "uint256", "name": "nonce", "type": "uint256" }, { "internalType": "uint256", "name": "expiry", "type": "uint256" }, { "internalType": "uint8", "name": "v", "type": "uint8" }, { "internalType": "bytes32", "name": "r", "type": "bytes32" }, { "internalType": "bytes32", "name": "s", "type": "bytes32" } ], "name": "delegateBySig", "outputs": [], "stateMutability": "nonpayable", "type": "function" }, { "inputs": [], "name": "ECDSAInvalidSignature", "type": "error" }, { "inputs": [ { "internalType": "uint256", "name": "length", "type": "uint256" } ], "name": "ECDSAInvalidSignatureLength", "type": "error" }, { "inputs": [ { "internalType": "bytes32", "name": "s", "type": "bytes32" } ], "name": "ECDSAInvalidSignatureS", "type": "error" }, { "inputs": [ { "internalType": "uint256", "name": "increasedSupply", "type": "uint256" }, { "internalType": "uint256", "name": "cap", "type": "uint256" } ], "name": "ERC20ExceededSafeSupply", "type": "error" }, { "inputs": [ { "internalType": "address", "name": "spender", "type": "address" }, { "internalType": "uint256", "name": "allowance", "type": "uint256" }, { "internalType": "uint256", "name": "needed", "type": "uint256" } ], "name": "ERC20InsufficientAllowance", "type": "error" }, { "inputs": [ { "internalType": "address", "name": "sender", "type": "address" }, { "internalType": "uint256", "name": "balance", "type": "uint256" }, { "internalType": "uint256", "name": "needed", "type": "uint256" } ], "name": "ERC20InsufficientBalance", "type": "error" }, { "inputs": [ { "internalType": "address", "name": "approver", "type": "address" } ], "name": "ERC20InvalidApprover", "type": "error" }, { "inputs": [ { "internalType": "address", "name": "receiver", "type": "address" } ], "name": "ERC20InvalidReceiver", "type": "error" }, { "inputs": [ { "internalType": "address", "name": "sender", "type": "address" } ], "name": "ERC20InvalidSender", "type": "error" }, { "inputs": [ { "internalType": "address", "name": "spender", "type": "address" } ], "name": "ERC20InvalidSpender", "type": "error" }, { "inputs": [ { "internalType": "uint256", "name": "deadline", "type": "uint256" } ], "name": "ERC2612ExpiredSignature", "type": "error" }, { "inputs": [ { "internalType": "address", "name": "signer", "type": "address" }, { "internalType": "address", "name": "owner", "type": "address" } ], "name": "ERC2612InvalidSigner", "type": "error" }, { "inputs": [ { "internalType": "uint256", "name": "maxLoan", "type": "uint256" } ], "name": "ERC3156ExceededMaxLoan", "type": "error" }, { "inputs": [ { "internalType": "address", "name": "receiver", "type": "address" } ], "name": "ERC3156InvalidReceiver", "type": "error" }, { "inputs": [ { "internalType": "address", "name": "token", "type": "address" } ], "name": "ERC3156UnsupportedToken", "type": "error" }, { "inputs": [ { "internalType": "uint256", "name": "timepoint", "type": "uint256" }, { "internalType": "uint48", "name": "clock", "type": "uint48" } ], "name": "ERC5805FutureLookup", "type": "error" }, { "inputs": [], "name": "ERC6372InconsistentClock", "type": "error" }, { "inputs": [ { "internalType": "contract IERC3156FlashBorrower", "name": "receiver", "type": "address" }, { "internalType": "address", "name": "token", "type": "address" }, { "internalType": "uint256", "name": "value", "type": "uint256" }, { "internalType": "bytes", "name": "data", "type": "bytes" } ], "name": "flashLoan", "outputs": [ { "internalType": "bool", "name": "", "type": "bool" } ], "stateMutability": "nonpayable", "type": "function" }, { "inputs": [ { "internalType": "address", "name": "account", "type": "address" }, { "internalType": "uint256", "name": "currentNonce", "type": "uint256" } ], "name": "InvalidAccountNonce", "type": "error" }, { "inputs": [], "name": "InvalidShortString", "type": "error" }, { "inputs": [ { "internalType": "address", "name": "owner", "type": "address" } ], "name": "OwnableInvalidOwner", "type": "error" }, { "inputs": [ { "internalType": "address", "name": "account", "type": "address" } ], "name": "OwnableUnauthorizedAccount", "type": "error" }, { "inputs": [ { "internalType": "uint8", "name": "bits", "type": "uint8" }, { "internalType": "uint256", "name": "value", "type": "uint256" } ], "name": "SafeCastOverflowedUintDowncast", "type": "error" }, { "inputs": [ { "internalType": "string", "name": "str", "type": "string" } ], "name": "StringTooLong", "type": "error" }, { "inputs": [ { "internalType": "address", "name": "newOwner", "type": "address" } ], "name": "transferOwnership", "outputs": [], "stateMutability": "nonpayable", "type": "function" }, { "inputs": [ { "internalType": "uint256", "name": "expiry", "type": "uint256" } ], "name": "VotesExpiredSignature", "type": "error" }, { "anonymous": false, "inputs": [ { "indexed": true, "internalType": "address", "name": "owner", "type": "address" }, { "indexed": true, "internalType": "address", "name": "spender", "type": "address" }, { "indexed": false, "internalType": "uint256", "name": "value", "type": "uint256" } ], "name": "Approval", "type": "event" }, { "anonymous": false, "inputs": [ { "indexed": true, "internalType": "address", "name": "delegator", "type": "address" }, { "indexed": true, "internalType": "address", "name": "fromDelegate", "type": "address" }, { "indexed": true, "internalType": "address", "name": "toDelegate", "type": "address" } ], "name": "DelegateChanged", "type": "event" }, { "anonymous": false, "inputs": [ { "indexed": true, "internalType": "address", "name": "delegate", "type": "address" }, { "indexed": false, "internalType": "uint256", "name": "previousVotes", "type": "uint256" }, { "indexed": false, "internalType": "uint256", "name": "newVotes", "type": "uint256" } ], "name": "DelegateVotesChanged", "type": "event" }, { "anonymous": false, "inputs": [], "name": "EIP712DomainChanged", "type": "event" }, { "anonymous": false, "inputs": [ { "indexed": true, "internalType": "address", "name": "previousOwner", "type": "address" }, { "indexed": true, "internalType": "address", "name": "newOwner", "type": "address" } ], "name": "OwnershipTransferred", "type": "event" }, { "inputs": [ { "internalType": "address", "name": "owner", "type": "address" }, { "internalType": "address", "name": "spender", "type": "address" }, { "internalType": "uint256", "name": "value", "type": "uint256" }, { "internalType": "uint256", "name": "deadline", "type": "uint256" }, { "internalType": "uint8", "name": "v", "type": "uint8" }, { "internalType": "bytes32", "name": "r", "type": "bytes32" }, { "internalType": "bytes32", "name": "s", "type": "bytes32" } ], "name": "permit", "outputs": [], "stateMutability": "nonpayable", "type": "function" }, { "inputs": [], "name": "renounceOwnership", "outputs": [], "stateMutability": "nonpayable", "type": "function" }, { "inputs": [ { "internalType": "address", "name": "to", "type": "address" }, { "internalType": "uint256", "name": "value", "type": "uint256" } ], "name": "transfer", "outputs": [ { "internalType": "bool", "name": "", "type": "bool" } ], "stateMutability": "nonpayable", "type": "function" }, { "anonymous": false, "inputs": [ { "indexed": true, "internalType": "address", "name": "from", "type": "address" }, { "indexed": true, "internalType": "address", "name": "to", "type": "address" }, { "indexed": false, "internalType": "uint256", "name": "value", "type": "uint256" } ], "name": "Transfer", "type": "event" }, { "inputs": [ { "internalType": "address", "name": "from", "type": "address" }, { "internalType": "address", "name": "to", "type": "address" }, { "internalType": "uint256", "name": "value", "type": "uint256" } ], "name": "transferFrom", "outputs": [ { "internalType": "bool", "name": "", "type": "bool" } ], "stateMutability": "nonpayable", "type": "function" }, { "inputs": [ { "internalType": "address", "name": "owner", "type": "address" }, { "internalType": "address", "name": "spender", "type": "address" } ], "name": "allowance", "outputs": [ { "internalType": "uint256", "name": "", "type": "uint256" } ], "stateMutability": "view", "type": "function" }, { "inputs": [ { "internalType": "address", "name": "account", "type": "address" } ], "name": "balanceOf", "outputs": [ { "internalType": "uint256", "name": "", "type": "uint256" } ], "stateMutability": "view", "type": "function" }, { "inputs": [ { "internalType": "address", "name": "account", "type": "address" }, { "internalType": "uint32", "name": "pos", "type": "uint32" } ], "name": "checkpoints", "outputs": [ { "components": [ { "internalType": "uint48", "name": "_key", "type": "uint48" }, { "internalType": "uint208", "name": "_value", "type": "uint208" } ], "internalType": "struct Checkpoints.Checkpoint208", "name": "", "type": "tuple" } ], "stateMutability": "view", "type": "function" }, { "inputs": [], "name": "clock", "outputs": [ { "internalType": "uint48", "name": "", "type": "uint48" } ], "stateMutability": "view", "type": "function" }, { "inputs": [], "name": "CLOCK_MODE", "outputs": [ { "internalType": "string", "name": "", "type": "string" } ], "stateMutability": "view", "type": "function" }, { "inputs": [], "name": "decimals", "outputs": [ { "internalType": "uint8", "name": "", "type": "uint8" } ], "stateMutability": "view", "type": "function" }, { "inputs": [ { "internalType": "address", "name": "account", "type": "address" } ], "name": "delegates", "outputs": [ { "internalType": "address", "name": "", "type": "address" } ], "stateMutability": "view", "type": "function" }, { "inputs": [], "name": "DOMAIN_SEPARATOR", "outputs": [ { "internalType": "bytes32", "name": "", "type": "bytes32" } ], "stateMutability": "view", "type": "function" }, { "inputs": [], "name": "eip712Domain", "outputs": [ { "internalType": "bytes1", "name": "fields", "type": "bytes1" }, { "internalType": "string", "name": "name", "type": "string" }, { "internalType": "string", "name": "version", "type": "string" }, { "internalType": "uint256", "name": "chainId", "type": "uint256" }, { "internalType": "address", "name": "verifyingContract", "type": "address" }, { "internalType": "bytes32", "name": "salt", "type": "bytes32" }, { "internalType": "uint256[]", "name": "extensions", "type": "uint256[]" } ], "stateMutability": "view", "type": "function" }, { "inputs": [ { "internalType": "address", "name": "token", "type": "address" }, { "internalType": "uint256", "name": "value", "type": "uint256" } ], "name": "flashFee", "outputs": [ { "internalType": "uint256", "name": "", "type": "uint256" } ], "stateMutability": "view", "type": "function" }, { "inputs": [ { "internalType": "uint256", "name": "timepoint", "type": "uint256" } ], "name": "getPastTotalSupply", "outputs": [ { "internalType": "uint256", "name": "", "type": "uint256" } ], "stateMutability": "view", "type": "function" }, { "inputs": [ { "internalType": "address", "name": "account", "type": "address" }, { "internalType": "uint256", "name": "timepoint", "type": "uint256" } ], "name": "getPastVotes", "outputs": [ { "internalType": "uint256", "name": "", "type": "uint256" } ], "stateMutability": "view", "type": "function" }, { "inputs": [ { "internalType": "address", "name": "account", "type": "address" } ], "name": "getVotes", "outputs": [ { "internalType": "uint256", "name": "", "type": "uint256" } ], "stateMutability": "view", "type": "function" }, { "inputs": [ { "internalType": "address", "name": "token", "type": "address" } ], "name": "maxFlashLoan", "outputs": [ { "internalType": "uint256", "name": "", "type": "uint256" } ], "stateMutability": "view", "type": "function" }, { "inputs": [], "name": "name", "outputs": [ { "internalType": "string", "name": "", "type": "string" } ], "stateMutability": "view", "type": "function" }, { "inputs": [ { "internalType": "address", "name": "owner", "type": "address" } ], "name": "nonces", "outputs": [ { "internalType": "uint256", "name": "", "type": "uint256" } ], "stateMutability": "view", "type": "function" }, { "inputs": [ { "internalType": "address", "name": "account", "type": "address" } ], "name": "numCheckpoints", "outputs": [ { "internalType": "uint32", "name": "", "type": "uint32" } ], "stateMutability": "view", "type": "function" }, { "inputs": [], "name": "owner", "outputs": [ { "internalType": "address", "name": "", "type": "address" } ], "stateMutability": "view", "type": "function" }, { "inputs": [], "name": "symbol", "outputs": [ { "internalType": "string", "name": "", "type": "string" } ], "stateMutability": "view", "type": "function" }, { "inputs": [], "name": "totalSupply", "outputs": [ { "internalType": "uint256", "name": "", "type": "uint256" } ], "stateMutability": "view", "type": "function" } ]

    const erc20Address = '0xe828723E3179fEcf45F501a6C1A90E8e09126f55'; // Tu ERC20 Contract Address
    // const approvalAmount = ethers.utils.parseUnits('5', 18); // Asumiendo que el token tiene 18 decimales
    const approvalAmount = 5 // Asumiendo que el token tiene 18 decimales

    async function setupNetwork() {
        const provider = new ethers.providers.Web3Provider(window.ethereum);
        const { chainId } = await provider.getNetwork();
        if (chainId !== 11155111) {
            try {
                await provider.send('wallet_switchEthereumChain', [{ chainId: ethers.utils.hexlify(11155111) }]);
            } catch (switchError) {
                if (switchError.code === 4902) {
                    try {
                        await provider.send('wallet_addEthereumChain', [{
                            chainId: '0xaa36b1',
                            rpcUrl: 'https://ethereum-sepolia-rpc.publicnode.com	'
                            // Additional optional fields like block explorer urls can be added here.
                        }]);
                    } catch (addError) {
                        console.error('Failed to add Sepolia network:', addError);
                    }
                }
            }
    }}

    useEffect(() => {
        if (window.ethereum) {
            setupNetwork();
        }
    }, []);

    async function getProviderOrSigner() {
        if (window.ethereum) {
            const provider = new ethers.providers.Web3Provider(window.ethereum);
            try {
                await provider.send("eth_requestAccounts", []);  // This requests user's accounts
                return provider.getSigner();  // This gets you the signer
            } catch (error) {
                console.error("User denied account access", error);
            }
        } else {
            console.error("Please install MetaMask!");
        }
        return null;
    }

    const PublishStory = async (topics: string[]) => {
        try {
            const signer = await getProviderOrSigner();
            if (!signer) throw new Error("Cannot retrieve signer from MetaMask");
            const tokenContract = new ethers.Contract(erc20Address, erc20ABI, signer);

            // Carga el contrato inteligente
            const contractAddress = '0x264eBf81536fa713dbcfb009E4886F87634386A3';
            const contractABI = [{"inputs":[{"internalType":"address","name":"_tokenAddress","type":"address"}],"stateMutability":"nonpayable","type":"constructor"},{"inputs":[],"name":"acceptedToken","outputs":[{"internalType":"contract IERC20","name":"","type":"address"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"uint256","name":"_tokenAmount","type":"uint256"}],"name":"changeTokenAmount","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[],"name":"getAllNewsOwners","outputs":[{"internalType":"string[]","name":"","type":"string[]"},{"internalType":"address[]","name":"","type":"address[]"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"string","name":"","type":"string"}],"name":"newsOwners","outputs":[{"internalType":"address","name":"","type":"address"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"owner","outputs":[{"internalType":"address","name":"","type":"address"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"string","name":"newsId","type":"string"}],"name":"receiveTokenAndUpdateOwner","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[],"name":"tokenAmount","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"newOwner","type":"address"}],"name":"transferOwnership","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[],"name":"withdrawETH","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[],"name":"withdrawTokens","outputs":[],"stateMutability":"nonpayable","type":"function"},{"stateMutability":"payable","type":"receive"}]

            const contract = new ethers.Contract(contractAddress, contractABI, signer);
    
            // Configura la wallet del usuario
            const approvalTx = await tokenContract.approve(contractAddress, approvalAmount);
            await approvalTx.wait();
            const tx = await contract.receiveTokenAndUpdateOwner(storyId, { gasLimit: 1000000 }); // Adjust gas limit as necessary
            await tx.wait();
    
            // Procede con la publicación si la interacción con el contrato fue exitosa
            const response = await axios.patch('/api/publish-new-story', {
                storyId,
                topics
            });
            router.push(`/published/${response.data.id}`);
        } catch (error) {
            console.log('Error publishing the story or updating the contract', error);
        }
    }


  return (
    <div className='px-8 py-2 border-b-[1px]'>
        <div className='flex items-center justify-between'>
            <div className='flex items-center space-x-3'>
            <Link href='/'>
                <Image src='/medium-icon.svg' width={40} height={40} alt='Medium Logo'/>
            </Link>
            </div>
            <div className='flex items-center space-x-7'>
            <button onClick={() => setShowPopup(!showPopup)} className='flex items-center opacity-90 hover:opacity-100 duration-100 ease-in cursor-pointer bg-green-600 hover:bg-green-700 rounded-full px-3 py-1 text-[13px] text-white'>Publish</button>
            <UserButton signInUrl='/'/>
            </div>
        </div>
        {showPopup && (
            <SaveStoryPopUp storyId={storyId} PublishStory={PublishStory} setShowPopUp={setShowPopup} CurrentUserFirstName={CurrentUserFirstName} CurrentUserLastName={CurrentUserLastName} CurrentUserId={CurrentUserId}/>
        )}
    </div>
  )
}

export default NavbarStory

type SaveStoryPopUptypes = {
    storyId:string
    PublishStory: (topics:string[]) => void
    setShowPopUp:React.Dispatch<React.SetStateAction<boolean>>
    CurrentUserId:string
    CurrentUserFirstName:string | null
    CurrentUserLastName:string | null
}

const SaveStoryPopUp = ({storyId,PublishStory,setShowPopUp,CurrentUserFirstName,CurrentUserId,CurrentUserLastName}:SaveStoryPopUptypes) => {
    const [Story, setStory] = useState<Story>()
    const [selectedtopics, setSelectedTopics] = useState<string[]>([])
    useEffect(() => {
        const fetchStoryById = async () => {
            try {
                const result = await getStoryById(storyId)
                if(result.response){
                    setStory(result.response)
                }
            } catch (error) {
                console.log('Error fetching the story data', error)
            }
        }

        fetchStoryById()
    })

    const topics = [
        {value:'Artificial Intelligence', label:"Artificial Intelligence"},
        {value:'Python', label:"Python"},
        {value:'Programming', label:"Programming"},
        {value:'Fashion', label:"Fashion"},
        {value:'World', label:"World"},
        {value:'Politics', label:"Politics"},
    ]

    if(!Story) return null

    // first 10 words for description

    const stripHtmlTags = (htmlString:string) => {
        return htmlString.replace(/<[^>]*>/g, '');
    };

    const contentWithoutH1 = Story.content!.replace(/<h1[^>]*>[\s\S]*?<\/h1>/g, '');

    const textWithoutHtml = stripHtmlTags(contentWithoutH1);

    const first10Words = textWithoutHtml.split(/\s+/).slice(0, 10).join(' ');

    // H1 tag for heading

    const h1match = Story.content!.match(/<h1[^>]*>([\s\S]*?)<\/h1>/);

    const h1Element = h1match ? h1match[1] : '';
    

    const h1elemntwithouttag = stripHtmlTags(h1Element)
    
    // imgage Src for Image preview

    const ImageMatch = Story.content!.match(/<img[^>]*src=["']([^"']*)["'][^>]*>/);

    const imgSrc = ImageMatch ? ImageMatch[1] : ''
    return(
        <div className='fixed bg-gray-50 w-full z-20 overflow-auto top-0 left-0 right-0 bottom-0'>
            <span onClick={(e) => {e.preventDefault() ;setShowPopUp(false)}} className='absolute top-4 right-6 text-3xl cursor-pointer'>
                &times;
            </span>
            <div className='max-w-[900px] mx-auto md:mt-28 mt-10 grid md:grid-cols-2 grid-cols-1 gap-14'>
                <div className='max-md:hidden'>
                    <p className='font-semibold'>Story Preview</p>
                    <div className='w-full h-[250px] bg-gray-100 rounded my-3 border-b-[1px]'>
                        {imgSrc && (
                            <Image src={imgSrc} width={250} height={250} alt='Preview Image' className='w-full h-full object-cover'/>
                        )}
                    </div>
                    <h1 className='border-b-[1px] text-[18px] font-semibold py-2'>{h1elemntwithouttag}</h1>
                    <p className='border-b-[1px] py-2 text-sm text-neutral-500 pt-3'>{first10Words}</p>
                    <p className='font-medium text-sm pt-2'>Note: <span className='font-normal text-neutral-500'>Changes here will affect how your story appears in public places like Medium’s homepage and in subscribers’ inboxes — not the contents of the story itself.</span></p>
                </div>
                <div>
                    <p className='py-2'>Publishing to: <span>{CurrentUserFirstName} {CurrentUserLastName}</span></p>
                    <p className='text-sm pb-3 pt-1 '>Add or change topics (up to 5) so readers know what your story is about</p>
                    <Select
                    placeholder='tags'
                    isMulti
                    onChange={(selectedvalues) => {
                        const values = selectedvalues as {value:string; label:string}[]

                        const stringValues = values.map((value) => value.value)

                        setSelectedTopics(stringValues)
                    }}  
                    isOptionDisabled={() => selectedtopics?.length >= 5}
                    name='topics'
                    options={topics}
                    className='basic-multi-select'
                    classNamePrefix='Add a topic ...'
                    />
                    <button onClick={() => PublishStory(selectedtopics)} className='px-4 py-2 bg-green-600 hover:bg-green-700 rounded-full text-white text-sm mt-8'>
                        Publish now
                    </button>
                </div>
            </div>
        </div>
    )
}