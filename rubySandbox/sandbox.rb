require "./classifile.rb"
proc = Proc.new do
  dir "foo" do
    assert 1+1==2
    assert 2+2==4

    dir "bar" do
      assert 1==2
    end

    dir "aiueo" do
      assert 1==1
      empty_dir

      dir "kakikukeko" do
        assert false
      end
    end

    dir "fizz" do
      dir "buzz" do
        assert @file.basename.include?("test")
        assert_not @file.is_movie?

        @save_name = "test2.txt"
        dir "boon" do
          assert 1==0
        end

        assert 0==0
      end
    end

    dir "z" do
      assert true
    end
  end

end


fs = Classifile.new
target_file = TargetFile.new("C:/temp/test.txt")
fs.run(target_file,&proc)
