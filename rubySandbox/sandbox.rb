require "./file_saver.rb"

fs = FileSaver.new
fs.run do
  to "foo" do
    assert 1+1==2
    assert 2+2==4

    to "bar" do
      assert 1==2
    end

    to "fizz" do
      to "buzz" do
        to "boon" do
          assert 1==0
        end

        assert 0==0
      end
    end

    to "z" do
      assert true
    end
  end
end
