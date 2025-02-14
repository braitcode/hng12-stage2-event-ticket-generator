<form onSubmit={(e) => { e.preventDefault(); handleSubmit(); }} className="flex flex-col gap-6">
                    <div>
                        <label className='text-white'>Enter your name</label>
                        <input type="text" value={name} onChange={(e) => setName(e.target.value)}
                            className="w-full h-[48px] p-2 border border-[#07373F] rounded-lg text-white bg-transparent"
                            required />
                    </div>
                    <div>
                        <label className='text-white'>Enter your email*</label>
                        <input type="email" value={email} onChange={(e) => setEmail(e.target.value)}
                            className="w-full h-[48px] p-2 border border-[#07373F] rounded-lg text-white bg-transparent"
                            required />
                    </div>
                    <button type="submit" className="w-full h-[48px] bg-[#2BA4B9] rounded-lg text-white">
                        Get My Ticket
                    </button>
                </form>